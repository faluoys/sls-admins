import request from '@/utils/request'

import qs from 'qs'
//登录
export function login(data) {
    // console.log(data)
    return request({
        url: '/login.php',
        method: 'post',
        data
    })
}

//登录鉴权
export function userLoginAccess(params) {
    return request({
        url: '/userLoginAccess.php',
        params
    })
}

export function getPowerNav(params) {
    return request({
        url: '/getPowerNav.php',
        params
    })
}



