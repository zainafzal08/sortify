import { Song } from "./data/shared_types";

export interface AppColors {
  album: string;
  surface: string;
  bg: string;
}

export function createUpdateColorsEvent(colors: AppColors) {
  return new CustomEvent<AppColors>("update-colors", {
    bubbles: true,
    composed: true,
    detail: colors,
  });
}

export type UpdateColorsEvent = CustomEvent<AppColors>;

export interface PlaylistSelections {
  source: string;
  sinkUp: string;
  sinkRight: string;
  sinkLeft: string;
}

export function createStartSortingEvent(selections: PlaylistSelections) {
  return new CustomEvent<PlaylistSelections>("start-sorting", {
    bubbles: true,
    composed: true,
    detail: selections,
  });
}

export type StartSortingEvent = CustomEvent<PlaylistSelections>;
