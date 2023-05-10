import { defineStore } from 'pinia'
import{login} from '@/api/auth.js'
import {addNav} from '@/api/navs.js'

/**
 * 这个 第一个参数main，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
 * 将返回的函数命名为use...（更好的语义化） 是跨可组合项的约定，以使其符合你的使用习惯。
 */
export const useStore = defineStore('user',{
    // 为了完整类型推理，推荐使用箭头函数
    state:() => {
        return {
            // 所有这些属性都将自动推断出它们的类型
            userInfo_store: {
                dId: '',
                rId: '',
                uId: localStorage.getItem("uId") || "",
                uName: localStorage.getItem("uName") || "",
                uPwd: localStorage.getItem("uPwd") || "",
                uDel: '',
                uPower: '',
                uTel: '',
            },
            token: localStorage.getItem("token") || "", // 在页面刷新时已经保留token

        }
    },

    /**
     * 用来封装计算属性 有缓存功能  类似于computed
     */
    getters: {//接收
        getToken() {
            return this.token;
        },
        getUserInfo() {
            return this.userInfo_store;
        },

    },
    actions: {
        setToken(token) {
            localStorage.setItem("token",token);
            this.token = token;
        },
        setUserInfo(data) {
            this.userInfo_store = data
        },

        // // 异步的登录方法
        // async login(userInfo) {
        //     try {
        //         const response  = await login(userInfo);
        //
        //         if (response.token) {
        //             console.log(response.token)
        //             this.setToken(response.token);
        //             // 登录之后，token已经拿到了，然后getUser获取调用,
        //             return await this.getUser();
        //         }
        //     } catch (error) {
        //         // console.log(error);
        //     }
        // },
        // // 添加获取用户信息方法
        // async getUser() {
        //     // await useUserStore.getUser()
        //     try {
        //         const response = await user();
        //         this.setUserInfo(response)
        //         // this.setUName(response.userInfo_store.uName)
        //         // this.setUPwd(response.userInfo_store.uPwd);
        //         // this.setNUlr(response.nUlr);
        //         // this.setNLevel(response.nLevel)
        //         return response;
        //     } catch (error) {
        //         // console.log(error)
        //     }
        // }
    },
    // persist: {
    //     enabled: true, // 开启数据缓存
    // }
})

