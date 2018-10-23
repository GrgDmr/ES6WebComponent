import {
    WidgetBase
} from 'widgets/widget.base.core';

const templateHandler = (() => {

  const sharedStyles = `
      widget-one:not(:defined) {
          /* Pre-style, give layout, replicate widget-one's eventual styles, etc. */
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

class WidgetOne extends WidgetBase {

    static type = 'widget-one';

    constructor(mode = null) {
        super({
            mode: mode || 'runtime',
            templates: templateHandler.getTemplates({
              type: 'widget-one',
              counter: document.querySelectorAll('widget-one').length || 0
            })
        });

        this.messageBusPath = 'aaaaa/bbb/ccc/etc';
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }
}

export const Component = WidgetOne;