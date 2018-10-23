import EventEmitter from 'events';

export class WidgetsHandler extends EventEmitter {

    instances = new WeakMap();
    modulesMode = 'runtime';

    constructor({
        modulesMode = null
    } = null) {

        super();

        this.modulesMode = modulesMode || this.modulesMode;
        this.instances.set(this, new Map());
    }

    getInstance(instanceName) {
        throw new Error('getInstance not implemented exception');
    }

    onWidgetRendered() {
        console.log('widget rendered');
    }

    onWidgetConnected() {
        console.log('widget connected');
    }

    render({
        container = null,
        instance = null
    } = {}) {
        if (!container || !instance) {
            throw new Error('render: container and instance params are mandatory');
        }

        container.appendChild(instance);
    }

    /*viene passato il type o i types (array) dei wigdet. Il path è preso in qualche modo da un file di configurazione o qualcosa del genere  */
    async import(pathList = null) {

        if (!pathList) {
            throw new Error('pathList not exist');
        }

        const importHandler = (path) => new Promise(async (resolve, reject) => {
            try {
                const module = await System.import(path);

                resolve({
                    path,
                    module
                });

            } catch (error) {
                reject(error);
            }
        });

        return await Promise.all(pathList.map(importHandler));
    }

    async factory({
        pathList = null,
        typeList = null,
        container = null
    } = null) {

        const factoryHandler = (Component, path) => {

            const ComponentInstance = new Component(this.modulesMode);

            this.instances.get(this).set(ComponentInstance.uuid, {
                uuid: ComponentInstance.uuid,
                type: Component.type,
                modulePath: path,
                messageBusPath: null
            });

            //instanceMap.get(ComponentInstance.uuid).eventBus.on("widget:rendered", this.onWidgetRendered).on("widget:connected", this.onWidgetConnected);

            this.render({
                container,
                instance: ComponentInstance
            });
        };

        if (pathList) {
            const imported = await this.import(pathList);

            imported.forEach((importedItem) => {
                const Component = importedItem.module.Component;

                if (!window.customElements.get(Component.type)) {
                    window.customElements.define(Component.type, Component);
                }

                factoryHandler(Component, importedItem.path);
            });
        }

        if (typeList) {
            typeList.forEach((type) => {

                if (!window.customElements.get(type)) {
                    throw new Error(`type ${type} not yet registered. Please import module first.`)
                }

                const Component = window.customElements.get(type);

                factoryHandler(Component, null);
            });
        }
    }
}