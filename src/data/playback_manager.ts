import { Song } from "./shared_types";

class PlaybackManager {
  private audioElement: HTMLAudioElement | null;
  private paused = false;
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

  setTrack(song: Song) {
    this.audioElement?.pause();
    if (!song.preview_url) {
      this.audioElement = null;
    }
    this.audioElement = new Audio(song.preview_url);
    this.audioElement.volume = this.volume;
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
