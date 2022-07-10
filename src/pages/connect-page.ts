import { component } from "haunted";
import { css, html } from "lit";
import "../components/app-button";
import { useConstructableStylesheets } from "../helpers";
import { SPOTIFY_ICON } from "../app_icons";
import { spotifyInterface } from "../data/spotify";

function connectPage() {
  useConstructableStylesheets(this, [
    css`
      :host {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      h1 {
        color: white;
        font-size: 3rem;
        margin: 0;
        padding-bottom: 1rem;
      }
      p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
        padding-bottom: 1.5rem;
        text-align: center;
      }
    `,
  ]);

  return html`
    <h1 class="title">Sortify</h1>
    <p class="subtitle">Sort your songs into playlists with a simple swipe</p>
    <app-button
      @click=${() => spotifyInterface.startLogin()}
      .icon=${SPOTIFY_ICON}
    >
      Connect Spotify
    </app-button>
  `;
}

export const ConnectPage = component(connectPage);

customElements.define("connect-page", ConnectPage);
