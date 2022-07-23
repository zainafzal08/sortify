import { v4 as uuid } from "uuid";
import { debugLog } from "../debug";
import { ConnectionState, Playlist, Song } from "./shared_types";
import { VirtualList } from "./virtual_list";

const DEPLOYED_URL = location.origin + location.pathname;

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(a: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

interface TokenInfo {
  accessToken: string;
  expiry: number;
  refreshToken: string;
}

export class SpotifyInterface {
  private readonly clientID = "70674e9164054734bec8ba9a94600c65";
  private tokenInfo: null | TokenInfo = null;
  private playlists: Playlist[] = [];
  private userId: string = "";
  private pending = false;
  private listeners: Array<() => void> = [];
  private sendQueue: Array<{ songURI: string; playlistURI: string }> = [];

  unrecoverableError: Error | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    const storedTokenInfo = localStorage.getItem("token_info");
    const storedUserId = localStorage.getItem("user_id");
    if (storedTokenInfo && storedUserId) {
      this.tokenInfo = JSON.parse(storedTokenInfo) as TokenInfo;
      this.userId = storedUserId;
      this.pending = true;
      const isValid = await this.tokenValid();
      if (isValid) {
        await this.fetchPlaylists();
      }
      this.pending = false;
      this.notifyStateChangeListeners();
    }
    // Batch spotify requests every 2 seconds.
    setInterval(() => void this.processSendQueue(), 2000);
  }

  private async tokenValid() {
    if (this.tokenInfo.expiry > Date.now()) {
      return true;
    }
    const oldToken = { ...this.tokenInfo };
    this.tokenInfo = null;
    // Attempt a refresh.
    const res = await this.formRequest(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: oldToken.refreshToken,
        client_id: this.clientID,
      }
    );
    if (res.status !== 200) {
      // Refresh failed.
      return false;
    }
    // Refresh success!
    this.tokenInfo = oldToken;
    this.tokenInfo.accessToken = res.access_token;
    this.tokenInfo.expiry = Date.now() + Number(res.expires_in) * 1000;
    localStorage.setItem("token_info", JSON.stringify(this.tokenInfo));
    return true;
  }

  private userHasWriteAccess(item: any) {
    // We just arn't gonna touch collaborative playlists because i don't wanna
    // think about the implications.
    if (item.collaborative) return false;
    return item.owner.id === this.userId;
  }

  private async fetchPlaylists() {
    const playlistsResponse = await this.makeRequest(
      `users/${this.userId}/playlists`
    );
    const { items } = playlistsResponse;
    this.playlists = items.map((item: any) => ({
      name: item.name,
      uri: item.uri,
      writable: this.userHasWriteAccess(item),
    }));
  }

  private async putRequest(endpoint: string, body: Object) {
    // TODO: deduplicate the code here and in post request.
    if (!this.tokenInfo) {
      this.notifyBreakage(
        new Error("Attempted to make web request without tokens available.")
      );
      return;
    }
    if (!(await this.tokenValid())) {
      this.notifyBreakage(new Error("Token is invalid now."));
      return;
    }
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.tokenInfo.accessToken}`,
    };
    try {
      await fetch(url.href, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });
    } catch (err: unknown) {
      this.notifyBreakage(err as Error);
      return;
    }
  }

  private async postRequest(endpoint: string, body: Object) {
    if (!this.tokenInfo) {
      this.notifyBreakage(
        new Error("Attempted to make web request without tokens available.")
      );
      return null;
    }
    if (!(await this.tokenValid())) {
      this.notifyBreakage(new Error("Token is invalid now."));
      return null;
    }
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.tokenInfo.accessToken}`,
    };
    let r: Response;
    try {
      r = await fetch(url.href, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
    } catch (err: unknown) {
      this.notifyBreakage(err as Error);
      return null;
    }
    return r.json();
  }

  private async formRequest(href: string, params: Record<string, string>) {
    const url = new URL(href);
    let formBody = [];
    for (const property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    if (this.tokenInfo) {
      headers["Authorization"] = `Bearer ${this.tokenInfo.accessToken}`;
    }
    let r: Response;
    try {
      r = await fetch(url.href, {
        method: "POST",
        headers,
        body: formBody.join("&"),
      });
    } catch (err: unknown) {
      this.notifyBreakage(err as Error);
      return null;
    }
    return r.json();
  }

  private async makeRequest(
    endpoint: string,
    queryParams: Record<string, string> = {}
  ) {
    if (!this.tokenInfo) {
      this.notifyBreakage(
        new Error("Attempted to make web request without tokens available.")
      );
      return null;
    }
    if (!(await this.tokenValid())) {
      this.notifyBreakage(new Error("Token is invalid now."));
      return null;
    }
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    for (const k of Object.keys(queryParams)) {
      url.searchParams.set(k, queryParams[k]);
    }

    let r: Response;
    try {
      r = await fetch(url.href, {
        headers: {
          Authorization: `Bearer ${this.tokenInfo.accessToken}`,
        },
      });
    } catch (err: unknown) {
      this.notifyBreakage(err as Error);
      return null;
    }

    return r.json();
  }

  private notifyStateChangeListeners() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private notifyBreakage(err: Error) {
    this.unrecoverableError = err;
    this.notifyStateChangeListeners();
  }

  async startLogin() {
    const state = uuid();
    const code_verifier = `${uuid()}-${uuid()}`;
    const hashed = await sha256(code_verifier);
    const challange = base64urlencode(hashed);

    const url = new URL("https://accounts.spotify.com/authorize");
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", this.clientID);
    url.searchParams.set(
      "scope",
      "playlist-read-private playlist-modify-private user-read-email user-library-read user-library-modify"
    );
    url.searchParams.set("redirect_uri", DEPLOYED_URL);
    url.searchParams.set("state", state);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("code_challenge", challange);
    localStorage.setItem(
      "login-in-progress",
      JSON.stringify({ state, code_verifier })
    );
    window.location.href = url.href;
  }

  connectionState(): ConnectionState {
    let pendingLogin;
    if (this.unrecoverableError !== null) {
      return "unrecoverable";
    }

    pendingLogin = this.getPendingLogin() !== null;
    if (pendingLogin) {
      return "pending-login";
    } else if (this.pending) {
      return "pending-data";
    } else if (this.tokenInfo === null) {
      return "unconnected";
    }
    return "connected";
  }

  private getPendingLogin(): { code_verifier: string; state: string } {
    const pendingLogin = localStorage.getItem("login-in-progress");
    if (!pendingLogin) {
      return null;
    }
    return JSON.parse(pendingLogin);
  }

  async completeLogin(params: URLSearchParams) {
    const pendingLogin = this.getPendingLogin();
    if (pendingLogin === null) {
      this.notifyBreakage(
        new Error("Attempted to complete login with no pending login")
      );
      return;
    }
    const { code_verifier, state } = pendingLogin;
    const code = params.get("code");
    if (state !== params.get("state")) {
      this.notifyBreakage(
        new Error(
          "Returned state does not match last login request. Aborting due to CSRF Risk."
        )
      );
    }
    const res = await this.formRequest(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "authorization_code",
        code,
        redirect_uri: DEPLOYED_URL,
        client_id: this.clientID,
        code_verifier,
      }
    );

    localStorage.removeItem("login-in-progress");
    this.tokenInfo = {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      expiry: Date.now() + Number(res.expires_in) * 1000,
    };
    const me = await this.makeRequest("me");
    this.userId = me.id;
    localStorage.setItem("token_info", JSON.stringify(this.tokenInfo));
    localStorage.setItem("user_id", this.userId);

    await this.fetchPlaylists();
    this.notifyStateChangeListeners();
  }

  getAllPlaylists(): Playlist[] {
    return [
      ...this.playlists,
      {
        name: "Liked Songs",
        uri: "__LIKED__",
        writable: true,
      },
    ];
  }

  onStateChange(callback: () => void) {
    this.listeners.push(callback);
  }

  private async getAllLikedSongs() {
    const getLikedSongs = async (offset: number) => {
      const r = await this.makeRequest("me/tracks", {
        offset: String(offset),
        limit: "50",
      });
      if (r.items.length === 0) {
        return null;
      }
      return r.items.map((item: any) => item.track);
    };
    return new VirtualList<Song>(30, getLikedSongs, await getLikedSongs(0));
  }

  async getAllSongsInPlaylist(playlistURI: string) {
    if (playlistURI === "__LIKED__") {
      return this.getAllLikedSongs();
    }

    const playlistId = playlistURI.split(":")[2];
    const getSongs = async (offset: number): Promise<Song[]> => {
      const r = await this.makeRequest(`playlists/${playlistId}/tracks`, {
        fields:
          "items(track(uri,preview_url,name,artists(name),album(name, images)))",
        offset: String(offset),
        limit: "50",
      });
      if (r.items.length === 0) {
        return null;
      }
      return r.items.map((item: any) => item.track);
    };

    return new VirtualList<Song>(30, getSongs, await getSongs(0));
  }

  playlistUIDToName(playlistURI: string) {
    if (playlistURI === "__LIKED__") {
      return "Liked Songs";
    }
    return this.playlists.find((s) => s.uri === playlistURI).name;
  }

  addSongToPlaylist(songURI: string, playlistURI: string) {
    this.sendQueue.push({ songURI, playlistURI });
  }

  async processSendQueue() {
    const playlistMap: Record<string, string[]> = {};
    let count = 0;
    // Although the add items to playlist api lets you do up to 100, the add
    // items to users liked list is limited to 50, so we just limit each cycle
    // to 50 items.
    while (count < 50 && this.sendQueue.length > 0) {
      const { playlistURI, songURI } = this.sendQueue.shift();
      count++;
      if (playlistMap[playlistURI] === undefined) {
        playlistMap[playlistURI] = [];
      }
      playlistMap[playlistURI].push(songURI);
    }
    if (count > 0) {
      debugLog(`Commiting ${count} edits to spotify`);
    }
    const requests: Array<Promise<any>> = [];
    for (const [key, value] of Object.entries(playlistMap)) {
      let r: Promise<any>;
      if (key === "__LIKED__") {
        r = this.putRequest(
          `me/tracks`,
          value.map((uri: string) => uri.split(":")[2])
        );
      } else {
        const playlistId = key.split(":")[2];
        r = this.postRequest(`playlists/${playlistId}/tracks`, {
          uris: value,
        });
      }
      requests.push(r);
    }
    this.sendQueue = [];
    await Promise.all(requests);
  }
}

export const spotifyInterface = new SpotifyInterface();
