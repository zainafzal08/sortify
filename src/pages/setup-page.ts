import { component, useEffect } from "haunted";
import { css, html } from "lit";
import { SORT_ICON } from "../app_icons";
import { useConstructableStylesheets } from "../helpers";
import { spotifyInterface } from "../data/spotify";
import "../components/app-button";
import { createStartSortingEvent } from "../events";

function setupPage() {
  const playlists = spotifyInterface.getAllPlaylists();
  const writablePlaylists = playlists.filter((pl) => pl.writable);

  const getSelect = (id: string) =>
    this.shadowRoot.querySelector(`#${id}`) as HTMLSelectElement;

  const getSelections = () => {
    return {
      source: getSelect("source").value,
      sinkUp: getSelect("sink-up").value,
      sinkRight: getSelect("sink-right").value,
      sinkLeft: getSelect("sink-left").value,
    };
  };

  const onInputChange = () => {
    const btn = this.shadowRoot.querySelector("app-button");
    const selections = Object.values(getSelections());
    if (new Set(selections).size !== selections.length) {
      btn.setAttribute("disabled", "");
    } else {
      btn.removeAttribute("disabled");
    }
  };

  const onStartSort = () => {
    const btn = this.shadowRoot.querySelector("app-button");
    if (btn.hasAttribute("disabled")) {
      return;
    }
    this.dispatchEvent(createStartSortingEvent(getSelections()));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    // For debug purposes.
    if (e.key === "s" && e.ctrlKey) {
      console.log("Skipping setup.");
      this.dispatchEvent(
        createStartSortingEvent({
          source: playlists[playlists.length - 1].uri,
          sinkUp: writablePlaylists[0].uri,
          sinkRight: writablePlaylists[1].uri,
          sinkLeft: writablePlaylists[2].uri,
        })
      );
    }
  };

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
        padding-bottom: 2rem;
      }
      fieldset {
        width: calc(100% - 4rem);
        border-color: rgba(255, 255, 255, 0.7);
        outline: none;
        border-style: solid;
        border-radius: 8px;
        margin-bottom: 1.5rem;
      }
      fieldset.row {
        display: flex;
      }
      fieldset select {
        width: 100%;
        background: none;
        color: white;
        border: none;
        outline: none;
        font-size: 0.9rem;
        font-weight: 600;
      }
      fieldset legend {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.7rem;
        padding: 0 0.5rem;
      }
      app-button {
        margin-top: 2rem;
      }
    `,
  ]);
  useEffect(() => {
    this.addEventListener("input", onInputChange);
    document.body.addEventListener("keydown", onKeyDown);
    onInputChange();
    return () => {
      this.removeEventListener("input", onInputChange);
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return html`
    <h1 class="title">Sortify</h1>
    <fieldset>
      <legend>Pick where to source songs from</legend>
      <select name="source" id="source">
        ${playlists.map(
          (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
        )}
      </select>
    </fieldset>
    <fieldset>
      <legend>Pick where songs go when you swipe them UP</legend>
      <select name="sink-up" id="sink-up">
        ${writablePlaylists.map(
          (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
        )}
      </select>
    </fieldset>
    <fieldset>
      <legend>Pick where songs go when you swipe them LEFT</legend>
      <select name="sink-left" id="sink-left">
        ${writablePlaylists.map(
          (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
        )}
      </select>
    </fieldset>
    <fieldset>
      <legend>Pick where songs go when you swipe them RIGHT</legend>
      <select name="sink-right" id="sink-right">
        ${writablePlaylists.map(
          (pl) => html` <option value=${pl.uri}>${pl.name}</option> `
        )}
      </select>
    </fieldset>
    <app-button @click=${onStartSort} .icon=${SORT_ICON}>
      Start Sorting</app-button
    >
  `;
}

export const SetupPage = component(setupPage);

customElements.define("setup-page", SetupPage);
