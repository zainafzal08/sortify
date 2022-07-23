import { VirtualList } from "./virtual_list";

export interface AppColors {
  album: string;
  surface: string;
  bg: string;
}

export interface AppState {
  source: string;
  sinkUp: string;
  sinkLeft: string;
  sinkRight: string;
  queue: VirtualList<Song>;
}

export interface Playlist {
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

export type Direction = "top" | "left" | "bottom" | "right";

export type ConnectionState =
  | "unrecoverable"
  | "pending-login"
  | "pending-data"
  | "connected"
  | "unconnected";

export type PlaybackState = "playing" | "paused" | "missing";
