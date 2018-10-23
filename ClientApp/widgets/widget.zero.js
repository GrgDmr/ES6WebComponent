import {
    WidgetBase
} from 'widgets/widget.base.core';

const templateHandler = (() => {

    const sharedStyles = `
        widget-zero:not(:defined) {
            /* Pre-style, give layout, replicate widget-zero's eventual styles, etc. */
            display: inline-block;
            height: 100vh;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
  
          :host {
            display: inline-block;
            width: 150px;
            height: 150px;
            margin: 50px;
          }
  
          :host([hidden]) {
            display: none;
          }
        `;
  
    const runtime = (data) => `
            <style>
              
              ${sharedStyles}
          
              div {
                font-size: 18px;
                border: 1px solid #eeeeee;
              }
            </style>
          
          <div>${data.type} runtime ${data.counter}</div>
    `;
  
    const config = (data) => `
              <style>
                
                ${sharedStyles}
          
                div {
                    font-size: 18px;
                    border: 1px solid #eeeeee;
                  }
                </style>
              
              <div>${data.type} config ${data.counter}</div>
          `;
  
    return {
        getTemplates(data = null) {
            return {
                config: config(data),
                runtime: runtime(data)
            }
        }
    };
  })();

class WidgetZero extends WidgetBase {

    static type = 'widget-zero';

    constructor(mode = null) {
        super({
            mode: mode || 'runtime',
            templates: templateHandler.getTemplates({
              type: 'widget-zero',
              counter: document.querySelectorAll('widget-zero').length || 0
            })
        });

        this.messageBusPath = 'fff/bbggb/bbbb/nnn';
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }
}

export const Component = WidgetZero;