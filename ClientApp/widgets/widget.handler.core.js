import EventEmitter from 'events';

export class WidgetsHandler extends EventEmitter {

    const x = [{
        uuid: '',
        type: '',
        modulePath: '',
        messageBusPath: '',
        instance: null
    }]

    instances = {};
    modulesMode = 'runtime';

    constructor({
        modulesMode = null,
        pathList = null
    } = null) {

        this.modulesMode = modulesMode || this.modulesMode;
        this.pathList = pathList;
    }

    getInstance(instanceName) {
        return this.instances[instanceName];
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

            if (!pathList && !this.pathList) {
                throw new Error('pathList not exist');
            }
    
            if (pathList && pathList.length) {
                this.pathList = pathList;
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
    
            const importList = this.pathList.map(importHandler);
            return await Promise.all(importList);
            //this.importedList = await Promise.all(importList);
        }

    async factory({
        pathList = null,
        typeList = null,
        container = null
    } = null) {

        const instances = [];

        const factoryHandler = (importedItem) => {

            const Component = importedItem.module.Component;

            if (Component.type !== type) {
                return;
            }

            if (!window.customElements.get(Component.type)) {
                window.customElements.define(Component.type, Component);
            }

            this.instances[Component.type] = new Component(this.modulesMode);
            
            this.instances[Component.type].eventBus.on("widget:rendered", this.onWidgetRendered).on("widget:connected", this.onWidgetConnected);
            
            this.render({container, instance: this.instances[Component.type]});
        };

        if (pathList && pathList.lenth) {
            const imported = await this.import(pathList);

            imported.forEach(factoryHandler);
        }

        //this.typeList.forEach(factoryHandler);
    }
}