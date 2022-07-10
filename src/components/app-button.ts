import { component } from "haunted";
import { css, html, TemplateResult } from "lit";
import { useConstructableStylesheets } from "../helpers";

interface AppButtonProps extends HTMLElement {
  icon?: TemplateResult;
}

function appButton({ icon }: AppButtonProps) {
  useConstructableStylesheets(this, [
    css`
      button {
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
      button span {
        overflow: hidden;
        white-space: nowrap;
      }
    `,
  ]);
  return html`
    <button>
      ${icon}
      <span><slot></slot></span>
    </button>
  `;
}

export const AppButton = component(appButton);
customElements.define("app-button", AppButton);
