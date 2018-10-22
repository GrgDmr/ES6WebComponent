import uuid from 'uuid/v4';
import EventEmitter from 'events';

class WidgetEventBusHandler extends EventEmitter {}

export class WidgetConfig {}

export class WidgetBase extends HTMLElement {

    static get is() {
        return this.type || 'widget-base';
    }

    eventBus = new WidgetEventBusHandler();

    templateHandler = (() => {
        const self = this;

        const build = (template) => {
            const templateElement = document.createElement('template');
            templateElement.innerHTML = template;
            return templateElement.content.cloneNode(true);
        };

        return {
            build
        };
    })();

    render(template) {
        this.root = this.attachShadow({
            mode: 'open'
        });
        this.root.appendChild(this.templateHandler.build(template));

        this.eventBus.emit("widget:rendered");
    }

    connectedCallback() {
        this.eventBus.emit("widget:connected");
    }

    disconnectedCallback() {
        this.eventBus.emit("widget:disconnected");
    }

    //https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
    constructor({
        mode = null,
        templates = null
    } = null) {

        const self = super();

        this.uuid = uuid();
        this.mode = mode;

        this.render(templates[mode]);

        return self;
    }

    get uuid() {
        return this._uuid;
    }

    set uuid(value = null) {
        if (value) {
            this._uuid = value;
            this.setAttribute('data-uuid', this._uuid);
        }
    }

    get mode() {
        return this._mode;
    }

    set mode(value = null) {
        if (value) {
            this._mode = value;
        }
    }
}