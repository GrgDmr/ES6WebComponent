import {
    WidgetBase
} from 'widgets/widget.base.core';

const templates = {
    config: `
    <style>
      span {
        font-size: 24px;
      }
    </style>
  
  <span>prova Configuratore</span>
  `,
    runtime: `
  <style>
    span {
      font-size: 24px;
    }
  </style>

<span>prova Runtime</span>
`
};

class WidgetZero extends WidgetBase {

    static type = 'widget-zero';

    constructor(mode = null) {
        super(mode || 'runtime');
    }

    connectedCallback() {

        const template = this.mode === 'runtime' ? templates.runtime : templates.config;

        super.render(template);
    }

    disconnectedCallback() {
        console.log("disconnected called");
    }

    /*static get observedAttributes() {
        return ['style'];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {        
        console.log("attributeChanged called - attrName: " + attrName + " oldVal: " + oldVal + " newVal: " + newVal);
    }*/
}

export const Component = WidgetZero;