import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path';
function pathResolve(dir){
    // 获取绝对定位的方法
    return resolve(process.cwd(), '.', dir);
}
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve:{
        alias:[
            {
                // 简化路径前缀，使用绝对地址
                find:'@',
                replacement:(pathResolve('./src'))
            }
        ]

    },
    optimizeDeps: {
        include: ['echarts']
    },
    server: {
        host: 'localhost',
        port: 8000
    }
})