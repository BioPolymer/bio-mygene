import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-ajax/iron-ajax";
import "@polymer/paper-tabs/paper-tabs";
import "@polymer/iron-pages/iron-pages";
import "./bio-mygene-summary";
import "./bio-mygene-protein";
import "./bio-mygene-pathways";
import "./bio-mygene-pubs";
import "@biopolymer-elements/bio-mygene-search";

/**
 * `BioMygenePanel`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioMygenePanel extends PolymerElement {
  static get properties() {
    return {
      /** The index of the selected card. */
      selectedPage: {
        type: Number,
        value: 0,
        observer: "_pageChanged"
      },

      id: {
        type: String,
        value: ""
      },

      /** The raw model derived from the response object. */
      rawModel: {
        type: Array,
        value: [],
        observer: "_rawModelChanged"
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          margin-left: 5px;
          margin-right: 5px;
        }
      </style>

      <iron-ajax
        url="https://mygene.info/v3/query"
        handle-as="json"
        last-response="{{rawModel}}"
        on-error="_handleError"
      ></iron-ajax>

      <paper-tabs selected="{{selectedPage}}">
        <paper-tab>Summary</paper-tab>
        <paper-tab>Protein</paper-tab>
        <paper-tab>Pathways</paper-tab>
        <paper-tab>Publications</paper-tab>
      </paper-tabs>

      <iron-pages selected="[[selectedPage]]">
        <section>
          <bio-mygene-summary class="panel"></bio-mygene-summary>
        </section>
        <section>
          <bio-mygene-protein class="panel"></bio-mygene-protein>
        </section>
        <section>
          <bio-mygene-pathways class="panel"></bio-mygene-pathways>
        </section>
        <section>
          <bio-mygene-pubs class="panel"></bio-mygene-pubs>
        </section>
      </iron-pages>
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

  _handleError(error) {
    console.log("An error occurred");
    console.log(error);
  }

  _pageChanged(newPage) {
    if (newPage != null) {
      var controllerParams = [
        {
          q: "entrezgene:" + this.id,
          fields:
            "symbol,alias,summary,entrezgene,HGNC,MIM,accession,ensembl,pharmgkb,unigene"
        },
        {
          q: "entrezgene:" + this.id,
          fields: "uniprot,pdb,interpro,pfam,prosite,pir"
        },

        {
          q: "entrezgene:" + this.id,
          fields: "pathway"
        },

        {
          q: "entrezgene:" + this.id,
          fields: "generif"
        }
      ];

      var controller = this.shadowRoot.querySelector("iron-ajax");
      controller.params = controllerParams[newPage];

      controller.generateRequest();
    }
  }

  _rawModelChanged(newModel, oldModel) {
    if (
      newModel !== undefined &&
      newModel != null &&
      newModel.hits !== undefined
    ) {
      var panels = this.shadowRoot.querySelectorAll(".panel");
      var selectedPanel = panels[this.selectedPage];
      //console.log(newModel);

      if (this.selectedPage == 0 || this.selectedPage == 1) {
        selectedPanel.model = newModel.hits[0];
      } else if (this.selectedPage == 2) {
        selectedPanel.model = newModel.hits[0].pathway;
      } else if (this.selectedPage == 3) {
        selectedPanel.model = newModel.hits[0].generif;
      }
    }
  }

  initView() {
    this._pageChanged(0);
  }
}

customElements.define("bio-mygene-panel", BioMygenePanel);
