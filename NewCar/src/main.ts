import { createApp} from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { piniaPlugin } from './utils/piniaPlugin'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Bar from './utils/loadingBar'

const whiteList = ['/login','/404']

router.beforeEach((to,from,next) => {
    Bar.component?.exposed?.startLoading() 
    document.title = to.meta.title
    
    if(whiteList.includes(to.path)||localStorage.getItem('token')){
        next()
    }else{
        next('/login')
    }
})

router.afterEach((to,from) => {
    Bar.component?.exposed?.endLoading()
})

const store = createPinia()
store.use(piniaPlugin({
    key:'pinia'
}))

let app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
