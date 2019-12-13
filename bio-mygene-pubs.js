import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout";
import "@polymer/iron-list/iron-list";
import "@biopolymer-elements/bio-pubmed/bio-pubmed-card";

/**
 * `bio-mygene-pubs`   This component is responsible for displaying a collection of pubmed articles.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioMygenePubs extends PolymerElement {
  static get properties() {
    return {
      /** An array of Gene RIF publications. */
      model: {
        type: Array,
        value: []
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .panel {
          @apply --layout-vertical;
        }
      </style>
      <div class="panel">
        <iron-list items="[[model]]" as="article">
          <template>
            <bio-pubmed-card model="[[article]]"></bio-pubmed-card>
          </template>
        </iron-list>
      </div>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

customElements.define("bio-mygene-pubs", BioMygenePubs);
