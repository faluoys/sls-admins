import {createRouter, createWebHistory} from "vue-router";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/',
        redirect: '/login',
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
        redirect: '/index',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: "首页"
        },
        children: [
            {
                path: '/index',
                name: 'index',
                meta: {
                    title: "首页"
                },
                components :{
                    home: () => import('@/views/home/index/index.vue'),
                }
            },
            {
                path: '/home/navs',
                name: 'home_navs',
                meta: {
                    title: "菜单管理"
                },
                components :{
                    home: () => import('@/views/home/navs/index.vue'),
                }
            },
            {
                path: '/home/dept',
                name: 'home_dept',
                meta: {
                    title: "部门管理"
                },
                components :{
                    home: () => import('@/views/home/dept/index.vue'),
                }
            },
            {
                path: '/home/roles',
                name: 'home_roles',
                meta: {
                    title: "角色管理"
                },
                components :{
                    home: () => import('@/views/home/roles/index.vue'),
                }
            },
            {
                path: '/home/users',
                name: 'home_users',
                meta: {
                    title: "员工管理"
                },
                components :{
                    home: () => import('@/views/home/users/index.vue'),
                }
            },
            {
                path: '/home/sonCom',
                name: 'home_sonCom',
                meta: {
                    title: "子公司管理"
                },
                components :{
                    home: () => import('@/views/home/sonCom/index.vue'),
                }
            },
            {
                path: '/home/scComProduct',
                name: 'home_scComProduct',
                meta: {
                    title: "产品管理"
                },
                components :{
                    home: () => import('@/views/home/scComProduct/index.vue'),
                }
            },
            {
                path: '/home/meeting',
                name: 'home_meeting',
                meta: {
                    title: "会议管理"
                },
                components :{
                    home: () => import('@/views/home/meeting/index.vue'),
                }
            },
            {
                path: '/home/checkOffice',
                name: 'home_checkOffice',
                meta: {
                    title: "会议申请"
                },
                components :{
                    home: () => import('@/views/home/checkOffice/index.vue'),
                }
            },
        ]
    },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

// function fun() {
//     const str = window.localStorage.getItem("powerNav");
//     const data = JSON.parse(str);
//
//     data.forEach((item) => {
//         let url = item.nUrl;
//         console.log(4, url);
//         let arr = url.split("/");
//         console.log(5, arr);
//         // console.log(6, arr[0]);
//         localStorage.setItem("path", JSON.stringify(arr[0]));
//         const obj = {
//             path: "/" + arr[0],
//             name: arr[0],
//             component: () => import("@/views/" + url),
//         };
//         router.addRoute(obj);
//     });
// }
//
// let flag = 0
// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("token");
//     document.title = to.meta.title
//     if (token) {
//         fun();
//         next();
//         if (flag === 0 && to.matched.length === 0) {
//             flag++
//             router.push(to.path);
//         } else if (flag !== 0 && to.matched.length === 0) {
//             next('/')
//         } else {
//             next()
//         }
//
//     } else {
//         if (to.path === "/") {
//             next();
//         } else {
//             next("/");
//         }
//     }
//
//
// });

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    const token = localStorage.getItem('token');
    if (token) {
        next();
    } else {
        if (to.path === '/') {
            next();
        } else {
            next('/');
        }
    }
});

export default router;