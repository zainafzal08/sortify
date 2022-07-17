import { Song } from "./shared_types";

class PlaybackManager {
  private audioElement: HTMLAudioElement | null;
  private paused = false;

  get active() {
    return this.audioElement !== null;
  }

  setTrack(song: Song) {
    this.audioElement?.pause();
    if (!song.preview_url) {
      this.audioElement = null;
    }
    this.audioElement = new Audio(song.preview_url);
    this.audioElement.volume = 0.5;
    this.audioElement.loop = true;
    if (!this.paused) {
      this.audioElement.play();
    }
  }

  playTrack() {
    this.paused = false;
    this.audioElement?.play();
  }

  pauseTrack() {
    this.paused = true;
    this.audioElement?.pause();
  }
}

export const playbackManager = new PlaybackManager();
