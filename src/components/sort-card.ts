import { component, useEffect } from "haunted";
import { css, html } from "lit";
import { Song } from "../data/shared_types";
import { useConstructableStylesheets } from "../helpers";

export const CARD_SIZE = 250;

interface SortCardProps extends HTMLElement {
  song?: Song;
}

function sortCard({ song }: SortCardProps) {
  useConstructableStylesheets(this, [
    css`
      :host {
        position: absolute;
        width: ${CARD_SIZE}px;
        height: ${CARD_SIZE}px;
        border-radius: 12px;
        cursor: pointer;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: column;
        background: black;
        touch-action: none;
      }
      :host(.animated) {
        transition: transform 0.15s linear;
      }
      :host(.front) {
        z-index: 3;
      }
      :host(.back) {
        z-index: 2;
      }
      .song-name {
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
      .album-artists {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.8rem;
        width: 100%;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `,
  ]);

  const imgUrl = song.album.images[0].url;
  useEffect(() => {
    const bgImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${imgUrl})`;
    this.style.backgroundImage = bgImage;
    this.style.backgroundSize = "contain";
  }, [song]);

  return html`
    <p class="song-name">${song.name}</p>
    <p class="album-artists">
      ${song.album.name} - ${song.artists.map((a) => a.name).join(", ")}
    </p>
  `;
}

export const SortCard = component(sortCard);
customElements.define("sort-card", SortCard);
