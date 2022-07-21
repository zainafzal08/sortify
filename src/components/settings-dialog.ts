import "weightless/slider";

import { component, useState } from "haunted";
import { css, html } from "lit";
import { CLOSE_ICON, GITHUB_ICON, HEART_ICON, SORT_ICON } from "../app_icons";
import { playbackManager } from "../data/playback_manager";
import { createSimpleEvent } from "../events";
import { useConstructableStylesheets } from "../helpers";

function settingsDialog() {
  const [volume, setVolume] = useState(playbackManager.volume);

  useConstructableStylesheets(this, [
    css`
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        place-items: center;
        z-index: 10;
      }
      :host([shown]) {
        display: grid;
      }
      .dialog {
        width: 80%;
        min-height: 100px;
        background: var(--surface-color);
        border-radius: 16px;
        box-sizing: border-box;
        padding: 1.5rem 1rem 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .dialog h2 {
        color: white;
        margin: 0;
        margin-bottom: 0.5rem;
      }
      .dialog label {
        width: 100%;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.7rem;
      }
      .button-list {
        width: 100%;
        display: flex;
      }
      .button-list a {
        text-decoration: none;
      }
      .button-list > * {
        margin-right: 0.5rem;
      }
      .range-slider-container {
        display: flex;
        padding: 1rem 0;
      }
      .range-slider-container p {
        font-size: 1.3rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        margin-right: 0.5rem;
        width: 5.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .footer {
        width: 100%;
        padding-top: 32px;
      }
      .footer p {
        margin: 0;
        padding: 0;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.7);
        text-align: right;
      }
      .footer a {
        color: rgba(255, 255, 255, 0.7);
      }
      .footer p svg {
        width: 0.6rem;
        height: 0.6rem;
        fill: rgba(255, 255, 255, 0.7);
        transform: translateY(0.05rem);
      }
      #close-button {
        position: absolute;
        top: 12px;
        display: flex;
        right: 12px;
        background: none;
        border: none;
        padding: 4px;
        cursor: pointer;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0);
      }
      #close-button:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      #close-button svg {
        fill: white;
        width: 18px;
        height: 18px;
      }
      wl-slider {
        width: 100%;
        --slider-thumb-bg: white;
        --input-state-color-active: white;
        --input-color: white;
        --_slider-track-bg-active: rgba(255, 255, 255, 0.7);
        --_slider-track-bg: rgba(255, 255, 255, 0.3);
        --slider-thumb-focus-ring-bg: rgba(255, 255, 255, 0.1);
        --slider-thumb-focus-ring-size: 8px;
      }
    `,
  ]);

  const restart = () => {
    this.dispatchEvent(createSimpleEvent("app-reset"));
  };
  const updateVolume = (value: number) => {
    playbackManager.volume = value;
    setVolume(value);
  };
  return html`
    <div class="dialog">
      <h2>Options</h2>
      <label> Playback Volume </label>
      <div class="range-slider-container">
        <p>${Math.round(volume * 100)}%</p>
        <wl-slider
          min="0"
          max="1"
          step="0.01"
          @input=${(e: InputEvent) =>
            updateVolume(Number((e.target as HTMLInputElement).value))}
        ></wl-slider>
      </div>
      <div class="button-list">
        <a href="https://github.com/zainafzal08/sortify/issues/new">
          <app-button small .icon=${GITHUB_ICON}> File Bug </app-button>
        </a>
        <app-button @click=${restart} small .icon=${SORT_ICON}>
          Start Again
        </app-button>
      </div>
      <div class="footer">
        <p>
          Created with ${HEART_ICON} by
          <a href="https://zainafzal.com">Zain Afzal</a>
        </p>
      </div>
      <button id="close-button" @click=${() => this.removeAttribute("shown")}>
        ${CLOSE_ICON}
      </button>
    </div>
  `;
}

export const SettingsDialog = component(settingsDialog);
customElements.define("settings-dialog", SettingsDialog);
