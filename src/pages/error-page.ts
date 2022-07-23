import { component } from "haunted";
import { css, html } from "lit";
import { GITHUB_ICON, REBOOT_ICON } from "../app_icons";
import { useConstructableStylesheets } from "../helpers";

interface ErrorPageProps extends HTMLElement {
  error: Error;
}

function errorPage({ error }: ErrorPageProps) {
  useConstructableStylesheets(this, [
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        flex-direction: column;
      }
      h1 {
        color: white;
        margin: 0;
        padding-bottom: 1rem;
        text-align: center;
        width: min(100%, 400px);
      }
      p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        text-align: center;
        width: min(100%, 400px);
        padding-bottom: 2rem;
      }
      .btns {
        width: min(100%, 400px);
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }
      .btns a {
        text-decoration: none;
      }
    `,
  ]);
  const fileBugLink = new URL(
    "https://github.com/zainafzal08/sortify/issues/new"
  );
  fileBugLink.searchParams.append(
    "title",
    `[Unrecoverable Error] ${error.message}`
  );
  fileBugLink.searchParams.append("body", error.stack);

  const rebootApp = () => {
    localStorage.clear();
    location.reload();
  };

  return html`
    <h1>Uh oh</h1>
    <p>
      Something went wrong, use the button below to reboot the app, hopefully
      that fixes it. If not please file a bug using the "file bug" button.
    </p>
    <div class="btns">
      <app-button @click=${rebootApp} .icon=${REBOOT_ICON}>
        Reboot App
      </app-button>
      <a href=${fileBugLink.href}>
        <app-button .icon=${GITHUB_ICON}> File Bug </app-button>
      </a>
    </div>
  `;
}

export const ErrorPage = component(errorPage);
customElements.define("error-page", ErrorPage);
