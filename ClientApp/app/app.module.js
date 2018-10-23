import {
    WidgetsHandler
} from 'widgets/widget.handler.core';

const createWidget = async () => {
    try {

        const contentElement = document.getElementById('container');

        const WidgetsHandlerInstance = new WidgetsHandler({
            modulesMode: 'config'
        });

        await WidgetsHandlerInstance.factory({
            pathList: ['widgets/widget.one', 'widgets/widget.zero'],
            typeList: ['widget-one', 'widget-zero', 'widget-zero'],
            container: contentElement
        });

        console.log(`widget-one counter: ${document.querySelectorAll('widget-one').length}`);

        const newComponentelement = contentElement.querySelector('widget-one');
        //contentElement.querySelector('widget-one').eventBus
        //contentElement.querySelector('widget-one').mode
        //contentElement.querySelector('widget-one').messageBusPath
    } catch (error) {
        console.log(error);
    }
};

createWidget();