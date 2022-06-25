import { v4 as uuid } from "uuid";

const DEPLOYED_URL = location.href;

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
  album: {
    images: AlbumImage[];
    name: string;
  };
  artists: Array<{ name: string }>;
  name: string;
  preview_url: string;
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
    // Attempt a refresh.
    const res = await this.formRequest(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: this.tokenInfo.refreshToken,
        client_id: this.clientID,
      },
      this.tokenInfo.refreshToken
    );
    if (res.status !== 200) {
      // Refresh failed.
      this.tokenInfo = null;
      return false;
    }
    // Refresh success!
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

  private async formRequest(
    href: string,
    params: Record<string, string>,
    overrideAuth: string | null = null
  ) {
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
      headers["Authorization"] = `Bearer ${
        overrideAuth ? overrideAuth : this.tokenInfo.accessToken
      }`;
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
      "playlist-read-private playlist-modify-private user-read-email"
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
    return this.playlists;
  }

  onStateChange(callback: () => void) {
    this.listeners.push(callback);
  }

  async getAllSongsInPlaylist(playlistURI: string): Promise<Song[]> {
    const playlistId = playlistURI.split(":")[2];
    const r = await this.makeRequest(`playlists/${playlistId}/tracks`, {
      fields:
        "items(track(preview_url,name,artists(name),album(name, images)))",
    });
    return r.items.map((item) => item.track);
  }

  playlistUIDToName(playlistURI: string) {
    return this.playlists.find((s) => s.uri === playlistURI).name;
  }
}
