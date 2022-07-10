import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SpotifyInterface } from "./data/spotify";
import { styleMap } from "lit-html/directives/style-map.js";
import { normal } from "color-blend";
import { Song } from "./data/shared_types";

interface AppState {
  source: string;
  sinkUp: string;
  sinkLeft: string;
  sinkRight: string;
  queue: any;
}

interface Gesture {
  startPos: {
    x: number;
    y: number;
  };
  startTime: number;
}

const CARD_SIZE = 250;

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 *
 * Credit: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 */
function HSLToRGB(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBToHSL(r: number, g: number, b: number) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}

@customElement("app-view")
export class AppView extends LitElement {
  private spotifyInterface = new SpotifyInterface();
  private currentGesture: Gesture | null = null;
  private currentAlbumColorComputeToken: number = 0;
  private currentAudioTrack: HTMLAudioElement | null = null;
  private enablePlayback = true;
  private lastResizeEvent = 0;

  @property({ type: Object })
  appState: AppState | null = null;
  @property({ type: Boolean, reflect: true, attribute: "settings-open" })
  settingsOpen = false;

  static get styles() {
    return css`
      :host {
        width: 100vw;
        height: 100vh;
        display: block;
        position: relative;
        --card-size: ${CARD_SIZE}px;
      }
      .settings-dialog {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 3;
        place-items: center;
      }
      :host([settings-open]) {
        display: grid;
      }
      .settings-dialog > div {
        width: 300px;
        padding: 24px 24px;
        border-radius: 8px;
        box-sizing: border-box;
        background: var(--bg-color);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
      .settings-dialog > div > h2 {
        color: white;
        margin: 0;
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
      }
      fieldset input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        height: 3px;
        background: rgba(255, 255, 255, 0.4);
        width: 100%;
      }

      fieldset input[type="range"]::-webkit-slider-thumb {
        height: 16px;
        width: 16px;
        -webkit-appearance: none;
        appearance: none;
        background: #a0b7e8;
        border-radius: 50%;
        cursor: pointer;
      }

      fieldset input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.1);
      }

      :host([settings-open="true"]) .settings-dialog {
        display: grid;
      }

      @keyframes move-1 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-1);
        }
      }
      @keyframes move-2 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-2);
        }
      }
      @keyframes move-3 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-3);
        }
      }
      @keyframes move-4 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-4);
        }
      }
      @keyframes move-5 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-5);
        }
      }
      @keyframes move-6 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-6);
        }
      }
      @keyframes pulse {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.2;
        }
      }
      #background {
        background: var(--bg-color);
        transition: all 0.4s;
      }
      #background > path:nth-child(1) {
        animation: move-1 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(2) {
        animation: move-2 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(3) {
        animation: move-3 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(4) {
        animation: move-4 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(5) {
        animation: move-5 30s ease-in-out infinite alternate;
      }
      #background > g {
        animation: move-6 30s ease-in-out infinite alternate;
      }

      #background > * {
        transform-origin: center;
      }
      #background path {
        fill: var(--album-color);
        transition: fill 0.4s;
      }

      button {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      #content {
        width: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      #background {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
      }

      .spotify-connecting-graphic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .spotify-connecting-graphic .dot {
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        margin: 0 1rem;
        animation: pulse 1s infinite alternate;
      }
      .spotify-connecting-graphic .dot:nth-of-type(2) {
        animation-delay: 0.2s;
      }
      .spotify-connecting-graphic .dot:nth-of-type(3) {
        animation-delay: 0.4s;
      }
      .spotify-connecting-graphic svg {
        width: 72px;
        fill: white;
        margin-right: 1.5rem;
      }
      .spotify-connecting-graphic img {
        width: 72px;
        margin-left: 1.5rem;
      }
      .title {
        color: white;
        font-size: 3rem;
        margin: 0;
        padding-bottom: 1rem;
      }
      .subtitle {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
        padding-bottom: 2rem;
        text-align: center;
      }
      .action-btn {
        padding: 0.5rem 1rem;
        padding-left: 0.7rem;
        background: white;
        color: rgb(43, 50, 65);
        border: none;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 200ms ease-in-out;
      }
      .action-btn[disabled] {
        opacity: 0.5;
      }
      .action-btn:hover {
        transform: scale(1.05);
        transition: all 200ms ease-in-out;
      }
      .action-btn[disabled]:hover {
        transform: scale(1);
      }
      .action-btn svg {
        min-width: 14px;
        width: 14px;
        fill: rgb(43, 50, 65);
        margin-right: 0.5rem;
      }
      .action-btn span {
        overflow: hidden;
        white-space: nowrap;
      }
      fieldset {
        width: calc(100% - 4rem);
        border-color: rgba(255, 255, 255, 0.7);
        outline: none;
        border-style: solid;
        border-radius: 8px;
        margin-bottom: 1.5rem;
      }
      fieldset.row {
        display: flex;
      }
      fieldset select {
        width: 100%;
        background: none;
        color: white;
        border: none;
        outline: none;
        font-size: 0.9rem;
        font-weight: 600;
      }
      fieldset legend {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.7rem;
        padding: 0 0.5rem;
      }
      fieldset button {
        background: none;
        outline: none;
        border: none;
        display: grid;
        place-items: center;
        cursor: pointer;
      }
      fieldset button svg {
        width: 20px;
        height: 20px;
        fill: rgba(255, 255, 255, 0.6);
      }
      fieldset button:hover svg {
        fill: rgba(255, 255, 255, 0.8);
      }
      .card-container {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
        touch-action: none;
      }
      .card-container .card {
        position: absolute;
        width: var(--card-size);
        height: var(--card-size);
        background-size: contain;
        border-radius: 12px;
        cursor: pointer;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: column;
      }
      .card-container .card.animated {
        transition: transform 0.15s linear;
      }
      .card-container .card.front {
        z-index: 3;
      }
      .card-container .card.back {
        z-index: 2;
      }
      .card .song-name {
        margin: 0;
        margin-bottom: 0.25rem;
        font-weight: 600;
        color: white;
        font-size: 1.2rem;
        width: 100%;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .card .album-artists {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.8rem;
        width: 100%;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      #hidden-canvas {
        position: absolute;
        left: -1000px;
        opacity: 0;
        pointer-events: none;
      }
      .controls {
        display: flex;
        padding-bottom: 2rem;
        height: 200px;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
      .controls .col {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 0 0.5rem;
        width: 33%;
        box-sizing: border-box;
      }
      .controls .col:first-child {
        align-items: flex-end;
      }
      .controls .col:last-child {
        align-items: flex-start;
      }
      .controls .col:last-child button svg {
        margin-left: 0.5rem;
        margin-right: 0rem;
      }
      .controls .col > button {
        font-size: 0.75rem;
        width: 100%;
        justify-content: center;
      }
      .controls button.info {
        background-color: var(--surface-color);
        color: white;
      }
      .controls button.info svg {
        fill: white;
      }
      .controls button .overflow-container {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }
      .controls button .overflow-container.scrolling {
        justify-content: flex-start;
      }

      .controls button .overflow-container.scrolling:before {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(90deg, var(--surface-color), transparent);
        z-index: 2;
      }
      .controls button .overflow-container.scrolling:after {
        content: "";
        position: absolute;
        right: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(-90deg, var(--surface-color), transparent);
        z-index: 2;
      }
      .controls button .overflow-container .text {
        position: absolute;
      }
      .controls button .overflow-container .text.marquee {
        padding-left: 4px;
      }
      #playback-status svg,
      #playback-status .overflow-container {
        display: none;
      }
      #playback-status.started .started-view {
        display: flex;
      }
      #playback-status.error .error-view {
        display: flex;
      }
      #playback-status.stopped .stopped-view {
        display: flex;
      }

      @keyframes marquee {
        0% {
          transform: translateX(0%);
        }
        20% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      .marquee {
        animation: marquee 8s infinite linear;
      }
      .floating {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 2;
        font-size: 0.7rem;
      }
    `;
  }

  private connectSpotifyView() {
    return html`
      <h1 class="title">Sortify</h1>
      <p class="subtitle">Sort your songs into playlists with a simple swipe</p>
      <button
        class="action-btn"
        @click=${() => this.spotifyInterface.startLogin()}
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        Connect Spotify
      </button>
    `;
  }

  private spotifyPendingView() {
    return html`
      <div class="spotify-connecting-graphic">
        <svg viewBox="0 0 24 24">
          <path
            d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <img src="logo.svg" />
      </div>
    `;
  }

  private setupView() {
    const playlists = this.spotifyInterface.getAllPlaylists();
    const writablePlaylists = playlists.filter((pl) => pl.writable);
    return html`
      <h1 class="title">Sortify</h1>
      <fieldset>
        <legend>Pick where to source songs from</legend>
        <select name="source" id="source">
          ${playlists.map(
            (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
          )}
        </select>
      </fieldset>
      <fieldset>
        <legend>Pick where songs go when you swipe them UP</legend>
        <select name="sink-up" id="sink-up">
          ${writablePlaylists.map(
            (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
          )}
        </select>
      </fieldset>
      <fieldset>
        <legend>Pick where songs go when you swipe them LEFT</legend>
        <select name="sink-left" id="sink-left">
          ${writablePlaylists.map(
            (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
          )}
        </select>
      </fieldset>
      <fieldset>
        <legend>Pick where songs go when you swipe them RIGHT</legend>
        <select name="sink-right" id="sink-right">
          ${writablePlaylists.map(
            (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
          )}
        </select>
      </fieldset>
      <button
        id="start-sorting-btn"
        class="action-btn"
        disabled
        @click=${() => this.startSorting()}
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59"
          />
        </svg>
        Start Sorting
      </button>
    `;
  }

  private onCardPick(e: PointerEvent) {
    if (this.currentGesture) return;
    this.currentGesture = {
      startPos: {
        x: e.clientX,
        y: e.clientY,
      },
      startTime: Date.now(),
    };
    const frontCard = this.renderRoot.querySelector(".card.front");
    frontCard.classList.remove("animated");
  }

  private onCardDrag(e: PointerEvent) {
    if (!this.currentGesture) return;
    const frontCard = this.renderRoot.querySelector(
      ".card.front"
    ) as HTMLElement;
    const delta = {
      x: e.clientX - this.currentGesture.startPos.x,
      y: e.clientY - this.currentGesture.startPos.y,
    };
    frontCard.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
  }

  private commitFrontCard(bucket: "top" | "bottom" | "left" | "right") {
    const front = this.appState.queue.pop();
    if (bucket === "top") {
      this.spotifyInterface.addSongToPlaylist(front.uri, this.appState.sinkUp);
    } else if (bucket === "left") {
      this.spotifyInterface.addSongToPlaylist(
        front.uri,
        this.appState.sinkLeft
      );
    } else if (bucket === "right") {
      this.spotifyInterface.addSongToPlaylist(
        front.uri,
        this.appState.sinkRight
      );
    }

    const { queue } = this.appState;
    let curr = queue.peekHead();
    let next = queue.peekNext();
    this.setAlbumColor(curr.album.images[0]);
    this.playbackSong(curr.preview_url);

    const oldFrontCard = this.renderRoot.querySelector(
      ".card.front"
    ) as HTMLElement;
    const oldBackCard = this.renderRoot.querySelector(
      ".card.back"
    ) as HTMLElement;

    oldBackCard.classList.remove("back");
    oldBackCard.classList.add("front");

    requestAnimationFrame(() => {
      if (!next) {
        oldFrontCard.remove();
      } else {
        oldFrontCard.classList.remove("front");
        oldFrontCard.classList.add("back");
        oldFrontCard.style.transform = `translate(0px, 0px)`;
        oldFrontCard.classList.remove("animated");
        oldFrontCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${next.album.images[0].url})`;
        (oldFrontCard.querySelector(".song-name") as HTMLElement).innerText =
          next.name;
        (
          oldFrontCard.querySelector(".album-artists") as HTMLElement
        ).innerText = `${next.album.name} - ${next.artists
          .map((a) => a.name)
          .join(", ")}`;
      }
    });
  }

  private onCardDrop(e: PointerEvent) {
    if (!this.currentGesture) return;
    const frontCard = this.renderRoot.querySelector(
      ".card.front"
    ) as HTMLElement;
    const bb = frontCard.getBoundingClientRect();
    // In px per ms.
    const deltaTime = Date.now() - this.currentGesture.startTime;
    const velocity = {
      x: (e.clientX - this.currentGesture.startPos.x) / deltaTime,
      y: (e.clientY - this.currentGesture.startPos.y) / deltaTime,
    };
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    let finalX, finalY;
    if (velocity.y < -1 || bb.y < CARD_SIZE * -0.25) {
      console.log("UP");
      finalX = 0;
      finalY = -winHeight;
      window.setTimeout(() => this.commitFrontCard("top"), 250);
    } else if (velocity.x < -1 || bb.x < CARD_SIZE * -0.25) {
      console.log("LEFT");
      finalX = -winWidth;
      finalY = 0;
      window.setTimeout(() => this.commitFrontCard("left"), 250);
    } else if (
      velocity.x > 1 ||
      bb.x + CARD_SIZE > winWidth + CARD_SIZE * 0.25
    ) {
      console.log("RIGHT");
      finalX = winWidth;
      finalY = 0;
      window.setTimeout(() => this.commitFrontCard("right"), 250);
    } else if (
      velocity.y > 1 ||
      bb.y + CARD_SIZE > winHeight + CARD_SIZE * 0.25
    ) {
      console.log("BOTTOM");
      finalX = 0;
      finalY = winHeight;
      window.setTimeout(() => this.commitFrontCard("bottom"), 250);
    } else {
      finalX = 0;
      finalY = 0;
    }
    this.currentGesture = null;
    frontCard.classList.add("animated");
    frontCard.style.transform = `translate(${finalX}px, ${finalY}px)`;
  }

  private async playbackSong(previewUrl: string) {
    this.currentAudioTrack?.pause();
    if (!previewUrl) {
      this.currentAudioTrack = null;
      this.updatePlaybackButton();
      return;
    }
    this.currentAudioTrack = new Audio(previewUrl);
    this.currentAudioTrack.volume = 0.5;
    this.currentAudioTrack.loop = true;
    if (this.enablePlayback) {
      this.currentAudioTrack.play();
    }
    this.updatePlaybackButton();
  }

  private async setAlbumColor(image: {
    url: string;
    width: number;
    height: number;
  }) {
    this.currentAlbumColorComputeToken++;
    const token = this.currentAlbumColorComputeToken;
    // Get image.
    const img = new Image(image.width, image.height);
    img.src = image.url;
    img.crossOrigin = "Anonymous";
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Render to Canvas.
    const canvas = this.renderRoot.querySelector(
      "#hidden-canvas"
    ) as HTMLCanvasElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get image data.
    const pixels = ctx.getImageData(0, 0, image.width, image.height);
    const totalPixels = pixels.width * pixels.height;
    const cumulativeValue = {
      r: 0,
      g: 0,
      b: 0,
    };
    const { data } = pixels;
    for (let i = 0; i < totalPixels; i++) {
      cumulativeValue.r += data[i * 4];
      cumulativeValue.g += data[i * 4 + 1];
      cumulativeValue.b += data[i * 4 + 2];
    }
    const avgColor = {
      r: Math.floor(cumulativeValue.r / totalPixels),
      g: Math.floor(cumulativeValue.g / totalPixels),
      b: Math.floor(cumulativeValue.b / totalPixels),
    };
    if (token < this.currentAlbumColorComputeToken) {
      // Another call to this function has happened, ignore this one.
      return;
    }
    let albumColorHsl = RGBToHSL(avgColor.r, avgColor.g, avgColor.b);
    let bgColor;

    if (albumColorHsl.l < 20) {
      // Album color is dark, swap bg and album so we always have a dark
      // background.
      bgColor = { ...albumColorHsl };
      albumColorHsl.l = 85;
    } else {
      bgColor = {
        ...albumColorHsl,
        l: 10,
      };
    }
    const albumColorRGB = HSLToRGB(
      albumColorHsl.h,
      albumColorHsl.s,
      albumColorHsl.l
    );
    this.style.setProperty(
      "--album-color",
      `hsl(${albumColorHsl.h}, ${albumColorHsl.s}%, ${albumColorHsl.l}%)`
    );
    const surfaceColor = normal(
      { ...albumColorRGB, a: 1 },
      { r: 0, g: 0, b: 0, a: 0.4 }
    );
    this.style.setProperty(
      "--surface-color",
      `rgb(${surfaceColor.r}, ${surfaceColor.g}, ${surfaceColor.b})`
    );
    this.style.setProperty(
      "--bg-color",
      `hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%)`
    );
  }

  private renderCard(song: Song, stackingOrder: "front" | "back") {
    const cardStyles = {
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${song.album.images[0].url})`,
    };

    return html`
      <div
        @pointerdown=${(e: PointerEvent) => this.onCardPick(e)}
        class="card ${stackingOrder}"
        style=${styleMap(cardStyles)}
      >
        <p class="song-name">${song.name}</p>
        <p class="album-artists">
          ${song.album.name} - ${song.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
    `;
  }

  private togglePlayback() {
    if (!this.currentAudioTrack) return;

    this.enablePlayback = !this.enablePlayback;
    if (this.enablePlayback) {
      this.currentAudioTrack.play();
    } else {
      this.currentAudioTrack.pause();
    }
    this.updatePlaybackButton();
  }

  private sortView() {
    const { queue } = this.appState;
    let front: TemplateResult, back: TemplateResult;
    const curr = queue.peekHead();
    const next = queue.peekNext();
    if (curr === null && next === null) {
      this.appState = null;
      // TODO: Have a nice "done" screen then a redirect.
      return html`done!`;
    } else if (curr !== null && next === null) {
      front = this.renderCard(curr, "front");
      back = null;
    } else {
      front = this.renderCard(curr, "front");
      back = this.renderCard(next, "back");
    }

    this.setAlbumColor(curr.album.images[0]);
    this.playbackSong(curr.preview_url);

    return html`
      <div class="card-container">${front} ${back}</div>
      <div class="controls">
        <div class="col">
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("left")}
          >
            <svg viewBox="0 0 48 48">
              <path
                d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"
              />
            </svg>
            <div class="overflow-container">
              <div class="text">
                ${this.spotifyInterface.playlistUIDToName(
                  this.appState.sinkLeft
                )}
              </div>
            </div>
            </span>
          </button>
        </div>
        <div class="col">
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("top")}
          >
            <svg viewBox="0 0 48 48">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z"
              />
            </svg>
            <div class="overflow-container">
              <div class="text">
                ${this.spotifyInterface.playlistUIDToName(this.appState.sinkUp)}
              </div>
            </div>
          </button>
          <button
            id="playback-status"
            class=${
              "action-btn " + (this.currentAudioTrack ? "started" : "error")
            }
            @click=${() => this.togglePlayback()}
          >
            <svg class="started-view" viewBox="0 0 48 48 ">
              <path
                d="M19.65 42q-3.15 0-5.325-2.175Q12.15 37.65 12.15 34.5q0-3.15 2.175-5.325Q16.5 27 19.65 27q1.4 0 2.525.4t1.975 1.1V6h11.7v6.75h-8.7V34.5q0 3.15-2.175 5.325Q22.8 42 19.65 42Z"
              />
            </svg>
            <svg class="stopped-view" viewBox="0 0 48 48">
              <path
                d="M19.65 42q-3.15 0-5.325-2.175Q12.15 37.65 12.15 34.5q0-3.15 2.175-5.325Q16.5 27 19.65 27q1.4 0 2.525.4t1.975 1.1V6h11.7v6.75h-8.7V34.5q0 3.15-2.175 5.325Q22.8 42 19.65 42Z"
              />
            </svg>
            <svg class="error-view" viewBox="0 0 48 48">
              <path
                d="M22.65 34H25.65V22H22.65ZM24 18.3Q24.7 18.3 25.175 17.85Q25.65 17.4 25.65 16.7Q25.65 16 25.175 15.5Q24.7 15 24 15Q23.3 15 22.825 15.5Q22.35 16 22.35 16.7Q22.35 17.4 22.825 17.85Q23.3 18.3 24 18.3ZM24 44Q19.75 44 16.1 42.475Q12.45 40.95 9.75 38.25Q7.05 35.55 5.525 31.9Q4 28.25 4 24Q4 19.8 5.525 16.15Q7.05 12.5 9.75 9.8Q12.45 7.1 16.1 5.55Q19.75 4 24 4Q28.2 4 31.85 5.55Q35.5 7.1 38.2 9.8Q40.9 12.5 42.45 16.15Q44 19.8 44 24Q44 28.25 42.45 31.9Q40.9 35.55 38.2 38.25Q35.5 40.95 31.85 42.475Q28.2 44 24 44Z"
              />
            </svg>
            
            <div class="overflow-container started-view">
              <div class="text">Stop</div>
            </div>
            <div class="overflow-container stopped-view">
              <div class="text">Start</div>
            </div>
            <div class="overflow-container error-view">
              <div class="text">Missing</div>
            </div>
          </button>
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("bottom")}
          >
            <svg viewBox="0 0 48 48">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"
              />
            </svg>
            <div class="overflow-container">
              <div class="text">Skip Track</div>
            </div>
          </button>
        </div>
        <div class="col">
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("right")}
          >
            <div class="overflow-container">
              <div class="text">
                ${this.spotifyInterface.playlistUIDToName(
                  this.appState.sinkRight
                )}
              </div>
            </div>
            <svg viewBox="0 0 48 48">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <canvas id="hidden-canvas"></canvas>
    `;
  }

  private async startSorting() {
    if (
      this.renderRoot
        .querySelector("#start-sorting-btn")
        .hasAttribute("disabled")
    ) {
      return;
    }
    const getSelect = (id: string) =>
      this.renderRoot.querySelector(`#${id}`) as HTMLSelectElement;
    const source = getSelect("source").value;
    this.appState = {
      source,
      sinkUp: getSelect("sink-up").value,
      sinkRight: getSelect("sink-right").value,
      sinkLeft: getSelect("sink-left").value,
      queue: await this.spotifyInterface.getAllSongsInPlaylist(source),
    };
  }

  private updateSetupViewValidity() {
    const getSelect = (id: string) =>
      this.renderRoot.querySelector(`#${id}`) as HTMLSelectElement;
    const btn = this.renderRoot.querySelector("#start-sorting-btn");
    const selections = [
      getSelect("source").value,
      getSelect("sink-up").value,
      getSelect("sink-right").value,
      getSelect("sink-left").value,
    ];
    if (new Set(selections).size !== selections.length) {
      btn.setAttribute("disabled", "");
    } else {
      btn.removeAttribute("disabled");
    }
  }

  private updatePlaybackButton() {
    const btn = this.renderRoot.querySelector(
      "#playback-status"
    ) as HTMLElement;
    if (!btn) return;
    btn.classList.remove("started");
    btn.classList.remove("stopped");
    btn.classList.remove("error");
    if (!this.currentAudioTrack) {
      btn.classList.add("error");
    } else if (this.enablePlayback) {
      btn.classList.add("started");
    } else {
      btn.classList.add("stopped");
    }
  }

  protected firstUpdated(): void {
    this.style.setProperty("--album-color", "#617193");
    this.style.setProperty("--surface-color", "#555B67");
    this.style.setProperty("--bg-color", "#2B3241");
    const numPaths = 6;
    for (let i = 0; i < numPaths; i++) {
      const x = Math.random() * 150 - 75;
      const y = Math.random() * 300 - 150;
      const d = Math.random() * 20 - 10;
      this.style.setProperty(
        `--rand-translate-${i + 1}`,
        `translate(${x}px,${y}px) rotate(${d}deg)`
      );
    }
    this.spotifyInterface.onStateChange(() => {
      this.requestUpdate();
    });
    const params = new URLSearchParams(document.location.search);
    if (
      params.has("code") &&
      params.has("state") &&
      this.spotifyInterface.connectionState() === "pending-login"
    ) {
      this.spotifyInterface.completeLogin(params);
    }
    this.onResize();
  }

  private activateOverflowScrollRegions() {
    const elements = Array.from(
      this.renderRoot.querySelectorAll(".overflow-container .text")
    );
    for (const element of elements) {
      const parent = element.parentElement;
      const parentDim = parent.getBoundingClientRect();
      const elementDim = element.getBoundingClientRect();
      if (parentDim.width < elementDim.width) {
        parent.classList.add("scrolling");
        element.classList.add("marquee");
      } else {
        parent.classList.remove("scrolling");
        element.classList.remove("marquee");
      }
    }
  }

  private programaticSwipe(bucket: "top" | "bottom" | "left" | "right") {
    let finalX = null;
    let finalY = null;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    if (bucket === "left") {
      window.setTimeout(() => this.commitFrontCard("left"), 250);
      finalX = -winWidth;
      finalY = 0;
    } else if (bucket === "right") {
      window.setTimeout(() => this.commitFrontCard("right"), 250);
      finalX = winWidth;
      finalY = 0;
    } else if (bucket === "top") {
      window.setTimeout(() => this.commitFrontCard("top"), 250);
      finalX = 0;
      finalY = -winHeight;
    } else {
      window.setTimeout(() => this.commitFrontCard("bottom"), 250);
      finalX = 0;
      finalY = winHeight;
    }
    const frontCard = this.renderRoot.querySelector(
      ".card.front"
    ) as HTMLElement;
    frontCard.classList.add("animated");
    frontCard.style.transform = `translate(${finalX}px, ${finalY}px)`;
  }

  private onKeyUp(e: KeyboardEvent) {
    if (!this.appState) {
      // No sort in progress.
      return;
    }

    if (e.key === "ArrowLeft") {
      this.programaticSwipe("left");
    } else if (e.key === "ArrowRight") {
      this.programaticSwipe("right");
    } else if (e.key === "ArrowUp") {
      this.programaticSwipe("top");
    } else if (e.key === "ArrowDown") {
      this.programaticSwipe("bottom");
    }
  }

  private onResize() {
    if (Date.now() - this.lastResizeEvent < 200) {
      // Throttle resize events so we only handle 1 every 200ms.
      return;
    }
    this.lastResizeEvent = Date.now();
    this.activateOverflowScrollRegions();
  }

  private openSettings() {
    this.settingsOpen = true;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // We never detach these so uh...never detach app-view!
    document.body.addEventListener("pointermove", (e: PointerEvent) => {
      this.onCardDrag(e);
    });
    document.body.addEventListener("pointerup", (e: PointerEvent) => {
      this.onCardDrop(e);
    });
    document.body.addEventListener("keyup", (e: KeyboardEvent) =>
      this.onKeyUp(e)
    );
    window.addEventListener("resize", () => this.onResize());
  }

  render() {
    const state = this.spotifyInterface.connectionState();
    let content, maybeButton;
    if (state === "pending-login" || state === "pending-data") {
      content = this.spotifyPendingView();
    } else if (state === "unconnected") {
      content = this.connectSpotifyView();
    } else if (!this.appState) {
      content = this.setupView();
    } else {
      content = this.sortView();
      requestAnimationFrame(() => this.activateOverflowScrollRegions());
    }

    if (state === "connected") {
      maybeButton = html`
        <button class="floating action-btn" @click=${() => this.openSettings()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48">
            <path
              d="m19.4 44-1-6.3q-.95-.35-2-.95t-1.85-1.25l-5.9 2.7L4 30l5.4-3.95q-.1-.45-.125-1.025Q9.25 24.45 9.25 24q0-.45.025-1.025T9.4 21.95L4 18l4.65-8.2 5.9 2.7q.8-.65 1.85-1.25t2-.9l1-6.35h9.2l1 6.3q.95.35 2.025.925Q32.7 11.8 33.45 12.5l5.9-2.7L44 18l-5.4 3.85q.1.5.125 1.075.025.575.025 1.075t-.025 1.05q-.025.55-.125 1.05L44 30l-4.65 8.2-5.9-2.7q-.8.65-1.825 1.275-1.025.625-2.025.925l-1 6.3ZM24 30.5q2.7 0 4.6-1.9 1.9-1.9 1.9-4.6 0-2.7-1.9-4.6-1.9-1.9-4.6-1.9-2.7 0-4.6 1.9-1.9 1.9-1.9 4.6 0 2.7 1.9 4.6 1.9 1.9 4.6 1.9Z"
            />
          </svg>
          Settings
        </button>
      `;
    }

    let currVolume = 50;
    if (this.currentAudioTrack) {
      currVolume = Math.ceil(this.currentAudioTrack.volume * 100);
    }
    const setVolume = (e: InputEvent) => {
      const newVol = Number((e.target as HTMLInputElement).value);
      if (this.currentAudioTrack) {
        this.currentAudioTrack.volume = newVol;
      }
      (
        this.renderRoot.querySelector("#curr-volume") as HTMLSpanElement
      ).innerText = String(Math.ceil(newVol));
    };
    return html`
      <svg
        id="background"
        xmlns="http://www.w3.org/2000/svg"
        width="375"
        height="604"
        viewBox="0 0 375 604"
        fill="none"
      >
        <path
          d="M428.242 98.6703C467.689 158.266 498.622 232.051 474.5 285.403C450.094 338.755 370.917 371.959 313.876 358.904C257.118 346.134 222.496 287.39 193.833 231.483C165.17 175.577 142.751 122.509 160.062 75.6834C177.373 29.1421 234.415 -11.4397 287.483 -8.88559C340.268 -6.3315 388.512 39.0747 428.242 98.6703Z"
        />
        <path
          d="M46.9848 28.5995C39.0715 40.5549 32.8661 55.3568 37.7052 66.0596C42.6012 76.7625 58.4847 83.4234 69.9277 80.8046C81.3137 78.2427 88.2592 66.4582 94.0092 55.2429C99.7591 44.0276 104.257 33.3817 100.784 23.9882C97.3111 14.6516 85.8682 6.51058 75.2222 7.02295C64.6332 7.53532 54.9551 16.6442 46.9848 28.5995Z"
        />
        <path
          d="M134.326 458.472C130.489 464.269 127.481 471.446 129.827 476.635C132.201 481.824 139.902 485.054 145.45 483.784C150.97 482.542 154.338 476.828 157.126 471.39C159.914 465.953 162.094 460.791 160.41 456.237C158.727 451.71 153.179 447.763 148.017 448.011C142.883 448.26 138.19 452.676 134.326 458.472Z"
        />
        <path
          d="M62.8931 252.113C66.0631 257.876 65.5444 265.542 62.0862 273.611C58.628 281.738 52.2879 290.268 41.0487 293.093C29.8096 295.859 13.6712 292.977 8.25338 283.698C2.77788 274.418 8.02284 258.856 16.0344 250.268C24.1035 241.738 34.9969 240.182 43.873 241.335C52.8067 242.487 59.7231 246.349 62.8931 252.113Z"
        />
        <path
          d="M118.037 384.728C128.514 403.778 126.799 429.114 115.37 455.783C103.94 482.643 82.9855 510.836 45.8391 520.17C8.69262 529.314 -44.6459 519.789 -62.5524 489.12C-80.6494 458.45 -63.3144 407.016 -36.8356 378.633C-10.1664 350.439 25.8371 345.296 55.1733 349.106C84.7 352.916 107.559 365.679 118.037 384.728Z"
        />
        <g>
          <path
            d="M409.211 380.486C379.728 354.489 197 407 194 413C223.5 431 300.046 423.982 343.277 420.967C377.54 418.305 438.695 406.483 409.211 380.486Z"
          />
          <path
            d="M406.38 453.845C386.751 419.789 255.694 416.403 192.619 418.967C202.67 434.4 289.039 460.174 330.967 471.132C364.284 479.559 426.01 487.9 406.38 453.845Z"
          />
          <path
            d="M371.679 513.017C364.886 479.578 271.133 441.452 206.849 420.49C195.05 416.642 188.553 425.334 197.707 433.713C222.879 456.751 268.509 488.444 294.674 505.515C323.603 524.066 379.505 551.538 371.679 513.017Z"
          />
          <path
            d="M321.797 542.143C325.521 512.472 267.107 458.044 216.116 417.843C197.234 402.957 182.89 413.769 195.953 433.955C213.297 460.755 236.343 491.538 251.228 510.426C272.712 537.249 316.903 581.145 321.797 542.143Z"
          />
        </g>
      </svg>
      <div id="content" @change=${() => this.updateSetupViewValidity()}>
        ${content} ${maybeButton}
        <div class="settings-dialog">
          <div>
            <h2>Settings</h2>
            <fieldset>
              <legend>
                Set Playback Volume (<span id="curr-volume">${currVolume}</span
                >)
              </legend>
              <input
                @input=${(e: InputEvent) => setVolume(e)}
                type="range"
                min="1"
                max="100"
                value=${currVolume}
              />
            </fieldset>
            <fieldset class="row">
              <legend>Contact Me</legend>
              <a href="https://github.com/zainafzal08/sortify">
                <button>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    />
                  </svg></button
              ></a>
              <a href="mailto:sortify@zainafzal.com">
                <button>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
                    />
                  </svg>
                </button>
              </a>
              <a href="https://twitter.com/blockzain">
                <button>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
                    />
                  </svg>
                </button>
              </a>
            </fieldset>
            <button
              class="action-btn"
              @click=${() => {
                this.settingsOpen = false;
              }}
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                />
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
