import {createRouter, createWebHistory, createWebHashHistory} from "vue-router";
import {ElMessage} from 'element-plus';
import { close, start } from '@/utils/nporgress.js';
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/',
        alias: '/home',
        redirect: '/home/index',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: "登录"
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: "首页"
        },
        children: [
            {
                path: 'index',
                name: 'index',
                // components: {
                //
                // },
                component: () => import('@/views/home/index/index.vue'),
                meta: {
                    title: "首页"
                }
            },
        ]
    },

    {
        path: '/dataVIndex',
        name: 'dataVIndex',
        component: () => import('@/views/dataVIndex/index.vue'),
        meta: {
            title: "可视化首页"
        }
    },
]
//根据权限动态生成路由
// const dongroute = []

const modules = import.meta.glob('../views/home/*/*.vue')  // 导入
function addDynamic() {
    // 获取 home 的路由配置
    const homeRoute = routes.find(route => route.name === 'home');
    const str = window.localStorage.getItem("powerNav");
    const data = JSON.parse(str);

    data.forEach(item => {
        let url = item.nUrl;
        // let url = 'users/index.vue'
        console.log(4, url);
        let arr = url.split("/");
        // console.log(5, arr);
        // console.log(6, arr[0]);
        localStorage.setItem("path", JSON.stringify(arr[0]));
        const dongroute = {
            // path: "/" + arr[0],
            path: arr[0],
            name: arr[0],
            meta: {
                title: item.nName,
            },
            // component: () => import(`../views/${url}`),
            // components: {
            //     // home: () => import("../views/" + url),
            //     home: modules[`../views/${url}`],
            // }
            component: modules[`../views/home/${url}`],
        }
        // router.addRoute(dongroute)
        // 添加 dongroute 到 home 的子路由中
        homeRoute.children.push(dongroute);
    });
    // 重新设置 home 的路由配置
    router.addRoute(homeRoute);
}

console.log(routes,'routes')

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
// 合并路由配置

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})
let flag = false; // 使用布尔值来表示是否已进行过动态路由添加

router.beforeEach((to, from, next) => {
    start();
    const token = localStorage.getItem("token");
    document.title = to.meta.title;

    if (token) {
        if (!flag) {
            // 如果还没有进行过动态路由添加，则添加动态路由
            addDynamic();
            flag = true;
        }

        if (to.matched.length === 0) {
            // 如果没有匹配的路由，重定向到首页或默认路由
            next('/');
        } else {
            next();
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next('/login')
        }
    }
});

router.afterEach(() => {
    close();
})


// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title
//     const token = localStorage.getItem('token');
//     if (!token && to.path !== '/login') {
//         ElMessage.error('请先登录！')
//         return next('login')
//     }
//     next()
// });

export default router;
