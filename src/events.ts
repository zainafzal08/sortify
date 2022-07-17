import { Direction } from "./data/shared_types";

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

export function createSortSongEvent(direction: Direction) {
  return new CustomEvent<Direction>("sort-song", {
    bubbles: true,
    composed: true,
    detail: direction,
  });
}

export type SortSongEvent = CustomEvent<Direction>;

export function createSimpleEvent(eventName: string) {
  return new CustomEvent<void>(eventName, {
    bubbles: true,
    composed: true,
  });
}

export type SimpleEvent = CustomEvent<void>;
