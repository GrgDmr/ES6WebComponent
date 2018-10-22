import {
    WidgetBase
} from 'widgets/widget.base.core';

class WidgetOne extends WidgetBase {

    static type = 'widget-one';

    templateHandler = (() => {

        const self = this;

        const sharedStyle = `
            widget-one:not(:defined) {
                /* Pre-style, give layout, replicate widget-one's eventual styles, etc. */
                display: inline-block;
                height: 100vh;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
              }

              :host {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
              :host([hidden]) {
                display: none;
              }
            `;

        const runtime = (data) => {
            return `
                <style>
                  
                  ${sharedStyle}
              
                  span {
                    font-size: 24px;
                  }
                </style>
              
              <span>prova Runtime</span>
            `;
        };

        const config = (data) => {
            return `
                  <style>
                    
                    ${sharedStyle}
              
                    span {
                      font-size: 24px;
                    }
                  </style>
                
                <span>prova Configuratore</span>
              `;
        };

        return {
            get() {
                return {
                    config: config(),
                    runtime: runtime()
                }
            }
        };
    })();

    constructor(mode = null) {
        const self = this;

        super({
            mode: mode || 'runtime',
            templates: self.templateHandler.get()
        });
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }
}

export const Component = WidgetOne;