import {h,createApp} from 'vue';
import infoWindowVue from '../components/infoWindow.vue';
import {createPinia} from 'pinia';
import router from '../router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let vm

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
    vm = app;
    return {div,app};
}
//根据mapData的数据，判断是否需要重新渲染组件



//卸载组件
const unmount = ()=>{
    vm.unmount();
}

export {createWindow,unmount}