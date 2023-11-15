import { createApp } from 'vue'

import App from './App.vue'
/** 重置样式 这里引入自定义的重置样式也可 */
import '@unocss/reset/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/assets/css/index.less'
import '@/assets/css/style.css'
/** 引入uno.css，不引入不生效 */
import 'uno.css'
//导入pinia
import { createPinia } from 'pinia'
import DataVVue3 from '@kjgl77/datav-vue3'

//创建pinia实例
const pinia = createPinia()
const app = createApp(App)
// 5. 创建并挂载根实例
app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.use(DataVVue3)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
