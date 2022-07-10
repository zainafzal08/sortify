import { component, useEffect } from "haunted";
import { css, html } from "lit";
import { AlbumImage, AppState, Song } from "../data/shared_types";
import {
  extractColorsFromImage,
  useConstructableStylesheets,
} from "../helpers";
import "../components/sort-card";
import { CARD_SIZE } from "../components/sort-card";
import { spotifyInterface } from "../data/spotify";
import { createUpdateColorsEvent } from "../events";

interface SortPageProps extends HTMLElement {
  appState: AppState;
}

function sortPage({ appState }: SortPageProps) {
  let currentGesture = null;
  let currentAlbumColorComputeToken = 0;

  const commitFrontCard = (bucket: "top" | "left" | "bottom" | "right") => {
    const song = appState.queue.pop();
    let playlist = null;
    if (bucket === "top") {
      playlist = appState.sinkUp;
    } else if (bucket === "left") {
      playlist = appState.sinkLeft;
    } else if (bucket === "right") {
      playlist = appState.sinkRight;
    }
    if (playlist !== null) {
      spotifyInterface.addSongToPlaylist(song.uri, playlist);
    }

    // We actually dodge doing a lit rerender here since the card z-index
    // shuffle results in weird artifacts that ruin the experience. Instead we
    // "promote" the back card to now be the front card and update the front
    // card to become the back card. Then we change the data in the back card
    // while it's safely out of view.
    const backCard = this.shadowRoot.querySelector("sort-card.back");
    const frontCard = this.shadowRoot.querySelector("sort-card.front");
    backCard.classList.remove("back");
    backCard.classList.add("front");

    const head = appState.queue.peekHead();
    updateColorsFromAlbum(head.album.images[0]);
    playbackSong(head);

    frontCard.classList.remove("front");
    frontCard.classList.remove("animated");
    frontCard.classList.add("back");
    frontCard.style.transform = "";
    frontCard.song = appState.queue.peekNext();
  };

  const onCardPick = (e: PointerEvent) => {
    if (currentGesture) return;
    currentGesture = {
      startPos: {
        x: e.clientX,
        y: e.clientY,
      },
      startTime: Date.now(),
    };
    const frontCard = this.shadowRoot.querySelector("sort-card.front");
    frontCard.classList.remove("animated");
  };
  const onCardDrag = (e: PointerEvent) => {
    if (!currentGesture) return;
    const frontCard = this.shadowRoot.querySelector(
      "sort-card.front"
    ) as HTMLElement;
    const delta = {
      x: e.clientX - currentGesture.startPos.x,
      y: e.clientY - currentGesture.startPos.y,
    };
    frontCard.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
  };
  const onCardDrop = (e: PointerEvent) => {
    if (!currentGesture) return;
    const frontCard = this.shadowRoot.querySelector(
      "sort-card.front"
    ) as HTMLElement;
    const bb = frontCard.getBoundingClientRect();
    // In px per ms.
    const deltaTime = Date.now() - currentGesture.startTime;
    const velocity = {
      x: (e.clientX - currentGesture.startPos.x) / deltaTime,
      y: (e.clientY - currentGesture.startPos.y) / deltaTime,
    };
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    let finalX, finalY;
    if (velocity.y < -1 || bb.y < CARD_SIZE * -0.25) {
      finalX = 0;
      finalY = -winHeight;
      window.setTimeout(() => commitFrontCard("top"), 250);
    } else if (velocity.x < -1 || bb.x < CARD_SIZE * -0.25) {
      finalX = -winWidth;
      finalY = 0;
      window.setTimeout(() => commitFrontCard("left"), 250);
    } else if (
      velocity.x > 1 ||
      bb.x + CARD_SIZE > winWidth + CARD_SIZE * 0.25
    ) {
      finalX = winWidth;
      finalY = 0;
      window.setTimeout(() => commitFrontCard("right"), 250);
    } else if (
      velocity.y > 1 ||
      bb.y + CARD_SIZE > winHeight + CARD_SIZE * 0.25
    ) {
      finalX = 0;
      finalY = winHeight;
      window.setTimeout(() => commitFrontCard("bottom"), 250);
    } else {
      finalX = 0;
      finalY = 0;
    }
    currentGesture = null;
    frontCard.classList.add("animated");
    frontCard.style.transform = `translate(${finalX}px, ${finalY}px)`;
  };
  const updateColorsFromAlbum = async (albumImg: AlbumImage) => {
    currentAlbumColorComputeToken++;
    const token = currentAlbumColorComputeToken;
    const hiddenCanvas = this.shadowRoot.querySelector("#hidden-canvas");
    const colors = await extractColorsFromImage(albumImg, hiddenCanvas);
    if (token < currentAlbumColorComputeToken) {
      // Another call to this function has happened, ignore this one.
      return;
    }
    this.dispatchEvent(createUpdateColorsEvent(colors));
  };
  const playbackSong = (song: Song) => {};

  const head = appState.queue.peekHead();
  const next = appState.queue.peekNext();
  let frontCard = null;
  let backCard = null;
  if (head) {
    frontCard = html`<sort-card
      class="front"
      @pointerdown=${(e: PointerEvent) => onCardPick(e)}
      .song=${head}
    ></sort-card>`;
  }
  if (next) {
    backCard = html`<sort-card
      class="back"
      .song=${next}
      @pointerdown=${(e: PointerEvent) => onCardPick(e)}
    ></sort-card>`;
  }

  if (!head && !next) {
    // TODO: Dispatch done event.
    // TODO: Make this nice.
    return html` Done. `;
  }

  useEffect(() => {
    updateColorsFromAlbum(head.album.images[0]);
    playbackSong(head);
    this.addEventListener("pointermove", onCardDrag);
    this.addEventListener("pointerup", onCardDrop);
    return () => {
      this.removeEventListener("pointermove", onCardDrag);
      this.removeEventListener("pointerup", onCardDrop);
    };
  }, []);

  useConstructableStylesheets(this, [
    css`
      :host {
        width: 100%;
        height: 100%;
      }
      .card-container {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
        touch-action: none;
      }
    `,
  ]);

  return html`
    <div class="card-container">${frontCard} ${backCard}</div>
    <div class="controls">
      <div class="col">
        <app-button></app-button>
      </div>
      <div class="col">
        <app-button></app-button>
        <app-button></app-button>
        <app-button></app-button>
      </div>
      <div class="col">
        <app-button></app-button>
      </div>
    </div>

    <canvas id="hidden-canvas"></canvas>
  `;
}

export const SortPage = component(sortPage);

customElements.define("sort-page", SortPage);
