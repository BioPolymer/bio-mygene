import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout";
import "@biopolymer-elements/bio-link/bio-link-tray";

/**
 * `bio-mygene-pathways`
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioMygenePathways extends PolymerElement {
  static get properties() {
    return {
      /** The object model.*/
      model: {
        type: Object,
        value: null
      },

      kegg: {
        type: Array,
        computed: '_computeModel(model, "kegg")'
      },

      reactome: {
        type: Array,
        computed: '_computeModel(model, "reactome")'
      },

      wikipathways: {
        type: Array,
        computed: '_computeModel(model, "wikipathways")'
      },
      biocarta: {
        type: Array,
        computed: '_computeModel(model, "biocarta")'
      },
      netpath: {
        type: Array,
        computed: '_computeModel(model, "netpath")'
      },

      pid: {
        type: Array,
        computed: '_computeModel(model, "pid")'
      }
    };
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --bio-pathways-label-color: #505050;
        }
        .panel {
          @apply --layout-vertical;
        }
        bio-link-tray {
          margin-bottom: 5px;
          --bio-link-tray-label-color: var(--bio-pathways-label-color);
        }
      </style>
      <div class="panel">
        <bio-link-tray
          tray-title="KEGG"
          model="[[kegg]]"
          type="kegg"
        ></bio-link-tray>
        <bio-link-tray
          tray-title="Reactome"
          model="[[reactome]]"
          type="reactome"
        ></bio-link-tray>
        <bio-link-tray
          tray-title="Wikipathways"
          model="[[wikipathways]]"
          type="wikipathways"
        ></bio-link-tray>
        <bio-link-tray
          tray-title="Biocarta"
          model="[[biocarta]]"
          type="biocarta"
        ></bio-link-tray>
        <bio-link-tray
          tray-title="Netpath"
          model="[[netpath]]"
          type="netpath"
        ></bio-link-tray>
        <bio-link-tray
          tray-title="PID"
          model="[[pid]]"
          type="pid"
        ></bio-link-tray>
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
   * This method extracts the pathways for a particular pathway
   * database into an array. The array is used as a model for
   * the bio-link-tray.
   * @param model the "pathway" node object from the database
   * @param type the type of pathway database
   */
  _computeModel(model, type) {
    let nuPathArray = [];
    if (model != null) {
      let pathArray = eval("model." + type);
      if (pathArray !== undefined) {
        if (Array.isArray(pathArray)) {
          for (pathway of pathArray) {
            nuPathArray.push({
              id: pathway.id,
              text: pathway.name
            });
          }
        } else {
          nuPathArray.push({
            id: pathArray.id,
            text: pathway.name
          });
        }
      }
    }

    return nuPathArray;
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

customElements.define("bio-mygene-pathways", BioMygenePathways);
