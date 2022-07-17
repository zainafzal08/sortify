import { component, useEffect, useState } from "haunted";
import { css, html } from "lit";
import { AppState, Direction } from "../data/shared_types";
import { useConstructableStylesheets } from "../helpers";
import "../components/sort-card";
import "../components/sort-controls";

import { CARD_SIZE } from "../components/sort-card";
import { spotifyInterface } from "../data/spotify";
import { createSimpleEvent, SortSongEvent } from "../events";
import { playbackManager } from "../data/playback_manager";
import { colorManager } from "../data/color_manager";
import { SORT_ICON } from "../app_icons";

interface SortPageProps extends HTMLElement {
  appState: AppState;
}

let currentGesture = null;

function keyToDirection(key: string) {
  if (key === "ArrowLeft") {
    return "left";
  } else if (key === "ArrowRight") {
    return "right";
  } else if (key === "ArrowUp") {
    return "top";
  } else if (key === "ArrowDown") {
    return "bottom";
  } else {
    return null;
  }
}

function sortPage({ appState }: SortPageProps) {
  const [done, setDone] = useState(false);

  const commitFrontCard = (bucket: Direction) => {
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

    if (appState.queue.peekHead() === null) {
      setDone(true);
      return;
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
    colorManager.updateColorsFromAlbum(head.album.images[0]);
    playbackManager.setTrack(head);

    if (appState.queue.peekNext()) {
      frontCard.classList.remove("front");
      frontCard.classList.remove("animated");
      frontCard.classList.add("back");
      frontCard.style.transform = "";
      frontCard.song = appState.queue.peekNext();
    } else {
      frontCard.remove();
    }
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

  const throwAndCommitCard = (direction: Direction | null) => {
    const frontCard = this.shadowRoot.querySelector("sort-card.front");
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    let finalX, finalY;
    if (direction === "top") {
      finalX = 0;
      finalY = -winHeight;
    } else if (direction === "left") {
      finalX = -winWidth;
      finalY = 0;
    } else if (direction === "right") {
      finalX = winWidth;
      finalY = 0;
    } else if (direction === "bottom") {
      finalX = 0;
      finalY = winHeight;
    } else {
      finalX = 0;
      finalY = 0;
    }
    frontCard.classList.add("animated");
    frontCard.style.transform = `translate(${finalX}px, ${finalY}px)`;
    if (direction !== null) {
      window.setTimeout(() => commitFrontCard(direction), 250);
    }
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
    if (velocity.y < -1 || bb.y < CARD_SIZE * -0.25) {
      throwAndCommitCard("top");
    } else if (velocity.x < -1 || bb.x < CARD_SIZE * -0.25) {
      throwAndCommitCard("left");
    } else if (
      velocity.x > 1 ||
      bb.x + CARD_SIZE > winWidth + CARD_SIZE * 0.25
    ) {
      throwAndCommitCard("right");
    } else if (
      velocity.y > 1 ||
      bb.y + CARD_SIZE > winHeight + CARD_SIZE * 0.25
    ) {
      throwAndCommitCard("bottom");
    } else {
      throwAndCommitCard(null);
    }
    currentGesture = null;
  };

  const programaticSwipe = (direction: Direction | null) => {
    if (direction === null) {
      return;
    }
    throwAndCommitCard(direction);
  };

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
    return html`
      <div class="done-message">
        <h1 class="title">All Done!</h1>
        <p class="subtitle">
          Mighty fast fingers you have there, you've sorted all the songs in
          this playlist! Wanna go again?
        </p>
        <app-button
          .icon=${SORT_ICON}
          @click=${() => this.dispatchEvent(createSimpleEvent("app-reset"))}
        >
          Restart
        </app-button>
      </div>
    `;
  }

  useEffect(() => {
    colorManager.updateColorsFromAlbum(head.album.images[0]);
    playbackManager.setTrack(head);
    const onKeydown = (e: KeyboardEvent) =>
      programaticSwipe(keyToDirection(e.key));
    this.addEventListener("pointermove", onCardDrag);
    this.addEventListener("pointerup", onCardDrop);
    document.body.addEventListener("keydown", onKeydown);
    return () => {
      this.removeEventListener("pointermove", onCardDrag);
      this.removeEventListener("pointerup", onCardDrop);
      document.body.removeEventListener("keydown", onKeydown);
    };
  }, []);

  useConstructableStylesheets(this, [
    css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .card-container {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
        touch-action: none;
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
        padding-bottom: 1.5rem;
        text-align: center;
      }
      .done-message {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    `,
  ]);

  return html`
    <div class="card-container">${frontCard} ${backCard}</div>
    <sort-controls
      @sort-song=${(e: SortSongEvent) => programaticSwipe(e.detail)}
      .appState=${appState}
    >
    </sort-controls>
  `;
}

export const SortPage = component(sortPage);

customElements.define("sort-page", SortPage);
