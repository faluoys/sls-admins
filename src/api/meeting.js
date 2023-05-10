import request from '@/utils/request.js'

import qs from 'qs'

//获取所有office数据
export function allOffice(data) {
    return request({
        url: '/office/getOffice.php',
        method: 'post',
        data: qs.stringify(data)
    })
}

//新增
export function addOffice(params) {
    return request({
        url: '/office/addOffice.php',
        params
    })
}

//删除
export function delOffice(params) {
    return request({
        url: '/office/delOffice.php',
        params
    })
}

//获取一个
export function oneOffice(params) {
    return request({
        url: '/office/getOneOffice.php',
        params
    })
}

//修改
export function upOffice(params) {
    return request({
        url: '/office/updateOffice.php',
        params
    })
}


export function allCheckOffice(){
    return request({
        url:'office/getAllCheckOffice.php',
        method:'get',
    })
}

export function addCheck(params) {
    return request({
        url:'office/checkOffice.php',
        params,
    })
}