import { component } from "haunted";
import { css, html } from "lit";
import { SPOTIFY_ICON } from "../app_icons";
import { useConstructableStylesheets } from "../helpers";

function loadingPage() {
  useConstructableStylesheets(this, [
    css`
      @keyframes pulse {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.2;
        }
      }
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .dot {
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        background: white;
        border-radius: 50%;
        margin: 0 1rem;
        animation: pulse 1s infinite alternate;
      }
      .dot:nth-of-type(2) {
        animation-delay: 0.2s;
      }
      .dot:nth-of-type(3) {
        animation-delay: 0.4s;
      }
      svg {
        width: 72px;
        min-width: 48px;
        fill: white;
        margin-right: 1.5rem;
      }
      img {
        width: 72px;
        min-width: 48px;
        margin-left: 1.5rem;
      }
    `,
  ]);
  return html` ${SPOTIFY_ICON}
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <img src="logo.svg" />`;
}

export const LoadingPage = component(loadingPage);

customElements.define("loading-page", LoadingPage);
