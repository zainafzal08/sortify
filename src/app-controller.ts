import { component, useEffect, useState } from "haunted";
import { css, html, TemplateResult } from "lit";
import { spotifyInterface } from "./data/spotify";
import { useConstructableStylesheets } from "./helpers";
import "./pages/loading-page";
import "./pages/connect-page";
import "./pages/setup-page";
import "./pages/sort-page";
import "./pages/error-page";
import { PlaylistSelections, StartSortingEvent } from "./events";
import { AppState, ConnectionState } from "./data/shared_types";
import { colorManager } from "./data/color_manager";

const ANIMATIONS = css`
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
`;

function appController() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>(
    spotifyInterface.connectionState()
  );

  const startSorting = async (selections: PlaylistSelections) => {
    setConnectionState("pending-data");
    setAppState({
      ...selections,
      queue: await spotifyInterface.getAllSongsInPlaylist(selections.source),
    });
    setConnectionState("connected");
  };
  const randomizeAnimation = () => {
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
  };
  const maybeCompleteLogin = async () => {
    const params = new URLSearchParams(document.location.search);
    if (
      params.has("code") &&
      params.has("state") &&
      connectionState === "pending-login"
    ) {
      await spotifyInterface.completeLogin(params);
      window.history.replaceState({}, document.title, location.pathname);
    }
  };
  const resetApp = () => {
    setAppState(null);
    colorManager.resetToDefault();
  };
  let page: TemplateResult;

  if (
    connectionState === "pending-data" ||
    connectionState === "pending-login"
  ) {
    page = html`<loading-page></loading-page> `;
  } else if (connectionState === "unrecoverable") {
    page = html`<error-page
      .error=${spotifyInterface.unrecoverableError}
    ></error-page>`;
  } else if (connectionState === "unconnected") {
    page = html`<connect-page></connect-page> `;
  } else if (appState === null) {
    page = html`<setup-page></setup-page> `;
  } else {
    page = html`<sort-page .appState=${appState}></sort-page>`;
  }

  useEffect(() => {
    spotifyInterface.onStateChange(() => {
      setConnectionState(spotifyInterface.connectionState());
    });
    colorManager.init();
    randomizeAnimation();
    maybeCompleteLogin();
  }, []);

  useConstructableStylesheets(this, [
    ANIMATIONS,
    css`
      :host {
        width: 100vw;
        height: 100vh;
        display: block;
        position: relative;
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
    `,
  ]);

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
    <div
      id="content"
      @app-reset=${() => resetApp()}
      @start-sorting=${(e: StartSortingEvent) => startSorting(e.detail)}
    >
      ${page}
    </div>
  `;
}

export const AppController = component(appController);
customElements.define("app-controller", AppController);
