import { extractColorsFromImage } from "../helpers";
import { AlbumImage, AppColors } from "./shared_types";

const DEFAULT_COLORS = {
  album: "#617193",
  surface: "#555b67",
  bg: "#2b3241",
};

/**
 * Owns setting and updating the css variables which define the color scheme
 * for the app.
 */
class ColorManager {
  private albumColorComputeToken = 0;
  private colors: AppColors = DEFAULT_COLORS;
  private hiddenCanvas: HTMLCanvasElement | null = null;
  private changeListeners = new Set<() => void>();

  private injectColors() {
    const root = document.body;
    root.style.setProperty("--album-color", this.colors.album);
    root.style.setProperty("--surface-color", this.colors.surface);
    root.style.setProperty("--bg-color", this.colors.bg);
  }

  init() {
    this.injectColors();
    this.hiddenCanvas = document.createElement("canvas");
    this.hiddenCanvas.id = "hidden-canvas";
    this.hiddenCanvas.style.position = "absolute";
    this.hiddenCanvas.style.left = "-1000px";
    this.hiddenCanvas.style.opacity = "0";
    this.hiddenCanvas.style.pointerEvents = "none";

    document.body.appendChild(this.hiddenCanvas);
  }

  async updateColorsFromAlbum(albumImg: AlbumImage) {
    this.albumColorComputeToken++;
    const token = this.albumColorComputeToken;
    const hiddenCanvas = this.hiddenCanvas;
    const colors = await extractColorsFromImage(albumImg, hiddenCanvas);
    if (token < this.albumColorComputeToken) {
      // Another call to this function has happened, ignore this one.
      return;
    }
    this.colors = colors;
    for (const listener of this.changeListeners) {
      listener();
    }
    this.injectColors();
  }

  resetToDefault() {
    this.colors = DEFAULT_COLORS;
    this.injectColors();
  }

  /**
   * Registers a listener to be called before the page color scheme changes.
   * Is not called for the initial color scheme set on page first load.
   */
  addColorChangeListener(listener: () => void) {
    this.changeListeners.add(listener);
  }

  /** Removes a listener which was previously registered with `addColorChangeListener`. */
  removeColorChangeListener(listener: () => void) {
    this.changeListeners.delete(listener);
  }
}

export const colorManager = new ColorManager();
