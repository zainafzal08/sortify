import { component, useEffect, useState } from "haunted";
import { css, html, TemplateResult } from "lit";
import { colorManager } from "../data/color_manager";
import { useConstructableStylesheets } from "../helpers";

interface AppButtonProps extends HTMLElement {
  icon?: TemplateResult;
  secondary?: boolean;
}

function appButton({ icon }: AppButtonProps) {
  const [colorSchemeUnstable, setColorSchemeUnstable] = useState(false);

  useConstructableStylesheets(this, [
    css`
      :host {
        --btn-bg-color: white;
        --btn-txt-color: var(--bg-color);
      }
      :host([secondary]) {
        --btn-bg-color: var(--surface-color);
        --btn-txt-color: white;
      }
      button {
        padding: 0.5rem 1rem;
        padding-left: 0.7rem;
        background: var(--btn-bg-color);
        color: var(--btn-txt-color);
        border: none;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 200ms ease-in-out;
        width: inherit;
      }
      :host([small]) button {
        font-size: 0.7rem;
        padding: 0.3rem 0.5rem 0.3rem 0.3rem;
      }
      :host([icon-only]) button {
        padding: 0.5rem;
      }
      :host([disabled]) button {
        opacity: 0.5;
      }
      button:hover {
        transform: scale(1.05);
        transition: all 200ms ease-in-out;
      }
      :host([disabled]) button:hover {
        transform: scale(1);
      }
      button svg {
        min-width: 14px;
        width: 14px;
        fill: rgb(43, 50, 65);
        margin-right: 0.5rem;
      }
      :host([icon-only]) svg {
        min-width: 18px;
        width: 18px;
        margin-right: 0rem;
      }
      :host([small]) svg {
        margin-right: 0.2rem;
      }
      :host([secondary]) button svg {
        fill: white;
      }
      button .scrolling {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        max-width: 100%;
      }
      :host([icon-only]) button .scrolling {
        display: none;
      }
      button .scrolling div {
        padding-left: 4px;
        padding-right: 4px;
        width: fit-content;
      }
      :host([auto-scroll]:not([unstable])) button .scrolling:before {
        transition: all 200ms ease-in-out;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(90deg, var(--btn-bg-color), transparent);
        z-index: 2;
      }
      :host([auto-scroll]:not([unstable])) button .scrolling:after {
        transition: all 200ms ease-in-out;
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(-90deg, var(--btn-bg-color), transparent);
        z-index: 2;
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
      button .scrolling div.marquee {
        animation: marquee 8s infinite linear;
      }
    `,
  ]);

  const beforeColorSchemeUnstable = () => {
    this.toggleAttribute("unstable", true);
    setTimeout(() => {
      this.toggleAttribute("unstable", false);
    }, 210);
  };

  useEffect(() => {
    colorManager.addColorChangeListener(beforeColorSchemeUnstable);
    const container = this.shadowRoot.querySelector(
      ".scrolling"
    ) as HTMLElement;
    const text = this.shadowRoot.querySelector(".scrolling div") as HTMLElement;
    const containerWidth = container.getBoundingClientRect().width;
    const textWidth = text.getBoundingClientRect().width;
    if (containerWidth < textWidth) {
      text.classList.add("marquee");
    } else {
      text.classList.remove("marquee");
    }
    return () => {
      colorManager.removeColorChangeListener(beforeColorSchemeUnstable);
    };
  }, []);

  return html`
    <button>
      ${icon}
      <div class="scrolling">
        <div><slot></slot></div>
      </div>
    </button>
  `;
}

export const AppButton = component(appButton);
customElements.define("app-button", AppButton);
