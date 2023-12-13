import {h,createApp} from 'vue';
import infoWindowVue from '../components/infoWindow.vue';
import {createPinia} from 'pinia';
import router from '../router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const createWindow = (closeApp:Function)=>{
    const div = document.createElement('div');
    const app = createApp({
        render:()=>h(infoWindowVue,{
            closeApp
        })
    });
    app.use(router);
    app.use(ElementPlus);
    app.mount(div);

    return {div,app};
}

export {createWindow}