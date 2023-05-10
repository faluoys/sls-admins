import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/index.less'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//导入pinia
import { createPinia } from 'pinia'

//创建pinia实例
const pinia = createPinia()
const app = createApp(App)
// 5. 创建并挂载根实例
app.use(router)
app.use(ElementPlus)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
