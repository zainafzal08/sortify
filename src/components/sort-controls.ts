import { component, useEffect, useState } from "haunted";
import { css, html, TemplateResult } from "lit";
import {
  ARROW_LEFT_ICON,
  ARROW_RIGHT_ICON,
  ARROW_UP_ICON,
  ERROR_ICON,
  PAUSE_ICON,
  PLAY_ICON,
  SKIP_ICON,
} from "../app_icons";
import { playbackManager } from "../data/playback_manager";
import { AppState, Direction, PlaybackState } from "../data/shared_types";
import { spotifyInterface } from "../data/spotify";
import { createSortSongEvent } from "../events";
import { useConstructableStylesheets } from "../helpers";

interface SortControlsProps extends HTMLElement {
  appState: AppState;
}

function sortControls({ appState }: SortControlsProps) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>("playing");

  useConstructableStylesheets(this, [
    css`
      :host {
        display: flex;
        padding-bottom: 2rem;
        height: 200px;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
      .col {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 0 0.5rem;
        width: 33%;
        box-sizing: border-box;
      }
      .col:first-child {
        align-items: flex-end;
      }
      .col:last-child {
        align-items: flex-start;
      }
      app-button {
        width: 100%;
      }
    `,
  ]);

  const togglePlayback = () => {
    if (!playbackManager.active) {
      return;
    }
    if (playbackState === "paused") {
      playbackManager.playTrack();
    } else {
      playbackManager.pauseTrack();
    }
  };

  useEffect(() => {
    playbackManager.addChangeListener((newState: PlaybackState) => {
      setPlaybackState(newState);
    });
    let currState: PlaybackState = "playing";
    if (!playbackManager.active) {
      currState = "missing";
    } else if (playbackManager.paused) {
      currState = "paused";
    }
    setPlaybackState(currState);
  }, []);

  const sortEvent = (direction: Direction) => {
    this.dispatchEvent(createSortSongEvent(direction));
  };

  const leftPlaylist = spotifyInterface.playlistUIDToName(appState.sinkLeft);
  const upPlaylist = spotifyInterface.playlistUIDToName(appState.sinkUp);
  const rightPlaylist = spotifyInterface.playlistUIDToName(appState.sinkRight);
  let playbackIcon: TemplateResult;
  let playbackMessage: string;

  if (playbackState === "missing") {
    playbackMessage = "Missing";
    playbackIcon = ERROR_ICON;
  } else {
    const paused = playbackState === "paused";
    playbackMessage = paused ? "Play" : "Pause";
    playbackIcon = paused ? PLAY_ICON : PAUSE_ICON;
  }
  return html`
    <div class="col">
      <app-button
        auto-scroll
        @click=${() => sortEvent("left")}
        secondary
        .icon=${ARROW_LEFT_ICON}
      >
        ${leftPlaylist}
      </app-button>
    </div>
    <div class="col">
      <app-button
        auto-scroll
        @click=${() => sortEvent("top")}
        secondary
        .icon=${ARROW_UP_ICON}
      >
        ${upPlaylist}
      </app-button>
      <app-button @click=${togglePlayback} .icon=${playbackIcon}>
        ${playbackMessage}
      </app-button>
      <app-button
        auto-scroll
        @click=${() => sortEvent("bottom")}
        secondary
        .icon=${SKIP_ICON}
      >
        Skip
      </app-button>
    </div>
    <div class="col">
      <app-button
        auto-scroll
        @click=${() => sortEvent("right")}
        secondary
        .icon=${ARROW_RIGHT_ICON}
        >${rightPlaylist}</app-button
      >
    </div>
  `;
}

export const SortControls = component(sortControls);
customElements.define("sort-controls", SortControls);
