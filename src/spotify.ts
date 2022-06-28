import { v4 as uuid } from "uuid";

const DEPLOYED_URL = location.origin + location.pathname;
const DEBUG = true;

function debugLog(s: string) {
  if (!DEBUG) return;
  console.log(s);
}
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

interface Playlist {
  name: string;
  uri: string;
  writable: boolean;
}

export interface AlbumImage {
  width: number;
  height: number;
  url: string;
}

export interface Song {
  uri: string;
  album: {
    images: AlbumImage[];
    name: string;
  };
  artists: Array<{ name: string }>;
  name: string;
  preview_url: string;
}

/**
 * Represents a remote list of data which is fetched regularly whenever a local
 * cache drops under `minCacheSize` items. More items are requested from remote
 * via the `getMore` function. The initial cache is populated witg `inital`.
 */
export class VirtualList<T> {
  private cache: T[] = [];
  private awaitingResponse = false;
  private requestOffset;
  private remoteEmpty = false;

  constructor(
    private readonly minCacheSize: number,
    private readonly getMore: (offset: number) => Promise<T[]>,
    initial: T[]
  ) {
    this.requestOffset = initial.length;
    this.cache.push(...initial);
  }

  private async requestMore() {
    debugLog("Requesting More Data");
    if (this.awaitingResponse) {
      debugLog("... Response already pending, abandoning request");
      return;
    }
    if (this.remoteEmpty) {
      debugLog("... Remote is empty, abandoning request");
      return;
    }

    this.awaitingResponse = true;
    debugLog("... Requesting Data");
    const additionalItems = await this.getMore(this.requestOffset);
    if (additionalItems === null) {
      debugLog("... null received, marking remote as empty.");
      this.remoteEmpty = true;
    } else {
      debugLog(`... ${additionalItems.length} items recieved.`);
      this.requestOffset += additionalItems.length;
      this.cache.push(...additionalItems);
    }
    this.awaitingResponse = false;
  }

  peekHead() {
    if (this.cache.length > 0) {
      return this.cache[0];
    }
    return null;
  }

  peekNext() {
    if (this.cache.length > 1) {
      return this.cache[1];
    }
    return null;
  }

  pop() {
    if (this.cache.length <= 0) {
      throw new Error("Tried to pop from a empty Virtual List");
    }
    debugLog("Popping from a virtual list");
    const result = this.cache.shift();
    if (this.cache.length < this.minCacheSize) {
      debugLog(
        `... Cache size has dipped below minCacheSize (${this.minCacheSize}), requesting more data.`
      );
      this.requestMore();
    }
    return result;
  }
}

export class SpotifyInterface {
  private readonly clientID = "70674e9164054734bec8ba9a94600c65";
  private tokenInfo: null | TokenInfo = null;
  private playlists: Playlist[] = [];
  private userId: string = "";
  private pending = false;
  private listeners: Array<() => void> = [];

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
      for (const listener of this.listeners) {
        listener();
      }
    }
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
    const r = await fetch(url.href, {
      method: "POST",
      headers,
      body: formBody.join("&"),
    });
    return r.json();
  }

  private async makeRequest(
    endpoint: string,
    queryParams: Record<string, string> = {}
  ) {
    if (!this.tokenInfo) {
      throw new Error(
        "Attempted to make web request without tokens available."
      );
    }
    if (!(await this.tokenValid())) {
      throw new Error("Token is invalid now.");
    }
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    for (const k of Object.keys(queryParams)) {
      url.searchParams.set(k, queryParams[k]);
    }
    const r = await fetch(url.href, {
      headers: {
        Authorization: `Bearer ${this.tokenInfo.accessToken}`,
      },
    });
    return r.json();
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

  connectionState() {
    let pendingLogin;
    try {
      this.getPendingLogin();
      pendingLogin = true;
    } catch (e) {
      pendingLogin = false;
    }
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
      throw new Error("Attemped to complete a non pending login.");
    }
    return JSON.parse(pendingLogin);
  }

  async completeLogin(params: URLSearchParams) {
    const pendingLogin = this.getPendingLogin();
    const { code_verifier, state } = pendingLogin;
    const code = params.get("code");
    if (state !== params.get("state")) {
      throw new Error(
        "Returned state does not match last login request. Aborting due to CSRF Risk."
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

    // This will notify listeners.
    await this.fetchPlaylists();
    for (const listener of this.listeners) {
      listener();
    }
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
    return this.playlists.find((s) => s.uri === playlistURI).name;
  }

  addSongToPlaylist(songURI: string, playlistURI: string) {
    if (playlistURI === "__LIKED__") {
      // TODO.
      return;
    }
    // TODO.
  }
}
