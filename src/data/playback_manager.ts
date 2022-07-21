import { Song, PlaybackState } from "./shared_types";

class PlaybackManager {
  private audioElement: HTMLAudioElement | null;
  private paused = false;
  private changeListeners: Array<(newState: PlaybackState) => void> = [];

  volumeInternal = 0.5;

  get active() {
    return this.audioElement !== null;
  }

  set volume(v: number) {
    if (this.audioElement) {
      this.audioElement.volume = v;
    }
    this.volumeInternal = v;
  }

  get volume() {
    return this.volumeInternal;
  }

  private notifyListeners() {
    let newState: PlaybackState;
    if (!this.active) {
      newState = "missing";
    } else if (this.paused) {
      newState = "paused";
    } else {
      newState = "playing";
    }

    for (const listener of this.changeListeners) {
      listener(newState);
    }
  }

  setTrack(song: Song) {
    let newState: PlaybackState = "playing";
    this.audioElement?.pause();
    if (!song.preview_url) {
      this.audioElement = null;
      newState = "missing";
    } else {
      this.audioElement = new Audio(song.preview_url);
      this.audioElement.volume = this.volume;
      this.audioElement.loop = true;
      if (!this.paused) {
        this.audioElement.play();
      }
    }
    this.notifyListeners();
  }

  playTrack() {
    this.paused = false;
    this.audioElement?.play();
    this.notifyListeners();
  }

  pauseTrack() {
    this.paused = true;
    this.audioElement?.pause();
    this.notifyListeners();
  }

  addChangeListener(listener: (newState: PlaybackState) => void) {
    this.changeListeners.push(listener);
  }
}

export const playbackManager = new PlaybackManager();
