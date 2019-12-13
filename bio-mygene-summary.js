import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@biopolymer-elements/bio-link/bio-link-fld";

import "@polymer/iron-flex-layout/iron-flex-layout";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-input/paper-textarea";

/**
 * `BioMygeneSummary`  This component displays a summary view of a gene target.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioMygeneSummary extends PolymerElement {
  static get properties() {
    return {
      /**
       * The model for the summary panel.
       */
      model: {
        type: Object,
        value: null
      },

      /** A comma-delimited list of aliases. */
      synonyms: {
        type: String,
        computed: "_flatten(model.alias)"
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
        <paper-input
          label="Symbol"
          value="[[model.symbol]]"
          readonly="true"
        ></paper-input>
        <paper-input
          label="Synonyms"
          value="[[synonyms]]"
          readonly="true"
        ></paper-input>
        <paper-textarea
          label="Summary"
          value="[[model.summary]]"
          readyonly="true"
        ></paper-textarea>

        <bio-link-fld
          label="EntrezGene ID"
          id="[[model.entrezgene]]"
          type="entrezgene"
        ></bio-link-fld>
        <bio-link-fld
          label="OMIM"
          id="[[model.MIM]]"
          type="omim"
        ></bio-link-fld>
        <bio-link-fld
          label="HGNC"
          id="[[model.HGNC]]"
          type="hgnc"
        ></bio-link-fld>
        <bio-link-fld
          label="UniGene"
          id="[[model.unigene]]"
          type="unigene"
        ></bio-link-fld>
        <bio-link-fld
          label="PharmGKB"
          id="[[model.pharmgkb]]"
          type="pharmgkb"
        ></bio-link-fld>
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

  /**
   * This method flattens a list of values into a single string.
   * @param list a list/array of values.
   */
  _flatten() {
    let flat = "";
    if (list !== undefined && list.length > 0) {
      flat = list.join(", ");
    }
    return flat;
  }
}

customElements.define("bio-mygene-summary", BioMygeneSummary);
