
import { WidgetsHandler } from 'widgets/widget.handler.core';

const createWidget = async () => {             
    try {       
       
        const contentElement = document.getElementById('container');

        const WidgetsHandlerInstance = new WidgetsHandler( {
            modulesMode:'config'
        });

        await WidgetsHandlerInstance.import();
        
        WidgetsHandlerInstance.factory({
            pathList:['widgets/widget.one'],
            typeList: ['widget-one'],
            container: contentElement
        });     

        contentElement.setAttribute('style', 'display:block');                     
    }
    catch (error) {
        console.log(error);
    }                
};

createWidget();             
