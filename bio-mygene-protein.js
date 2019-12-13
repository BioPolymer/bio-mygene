import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@biopolymer-elements/bio-pdb/bio-pdb-list";
import "@biopolymer-elements/bio-pdb/bio-pdb-viewer";
import "@biopolymer-elements/bio-link/bio-link-fld";
import "@biopolymer-elements/bio-link/bio-link-tray";

/**
 * `BioMygeneProtein` Description
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioMygeneProtein extends PolymerElement {
  static get properties() {
    return {
      domains: {
        type: Array,
        computed: "_computeDomains(model.interpro)"
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
        .pdb-subpanel {
          @apply --layout-horizontal;
          background-color: white;
          border: 1px solid #909090;
        }

        bio-pdb-list {
          --pdb-list-width: 30vw;
          --pdb-list-height: 250px;
        }
        bio-pdb-viewer {
          width: 70vw;
        }
        bio-link-tray {
          margin-top: 10px;
        }

        .pdb-panel {
          margin-top: 10px;
          @apply --layout-vertical;
        }

        label {
          color: var(--label-color, #909090);
          font-size: var(--label-font-size, 14px);
          font-family: var(--label-font-family, "Roboto");
        }
      </style>
      <div class="panel">
        <bio-link-fld
          label="UniProt ID"
          id="[[model.uniprot['Swiss-Prot'] ]]"
          type="uniprot"
          readonly="true"
        ></bio-link-fld>
        <bio-link-tray
          tray-title="InterPro Domains"
          model="[[domains]]"
          type="interpro"
        ></bio-link-tray>

        <div class="pdb-panel">
          <label>Protein Databank</label>
          <div class="pdb-subpanel">
            <bio-pdb-list model="[[model.pdb]]"></bio-pdb-list>
            <bio-pdb-viewer></bio-pdb-viewer>
          </div>
        </div>
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

  _computeDomains(domains) {
    var domainArray = [];
    for (domain of domains) {
      domainArray.push({ id: domain.id, text: domain.short_desc });
    }
    console.log(domainArray);
    return domainArray;
  }

  connectedCallback() {
    super.connectedCallback();
    // glue pdbList selection event to viewer
    let pdbList = this.shadowRoot.querySelector("bio-pdb-list");
    pdbList.addEventListener(
      "pdbIdChanged",
      function(e) {
        console.log(e);
        var viewer = this.shadowRoot.querySelector("bio-pdb-viewer");
        viewer.pdbId = e.detail.pdbId;
        console.log("viewer: " + viewer.pdbId);
      }.bind(this)
    );
  }
}

customElements.define("bio-mygene-protein", BioMygeneProtein);
