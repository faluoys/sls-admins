import request from '@/utils/request.js'


//获取所有角色
export function allRoles() {
    return request({
        url: '/roles/getAllRoles.php',
        method: 'get'
    })
}

//添加角色
export function addRoles(params) {
    return request({
        url: '/roles/addRoles.php',
        method: 'get',
        params
    })
}

//删除
export function delRoles(params) {
    return request({
        url: '/roles/delRoles.php',
        method: 'get',
        params
    })
}

//修改
export function oneRoles(params) {
    return request({
        url: '/roles/getOneRoles.php',
        method: 'get',
        params
    })
}

export function upRoles(params) {
    return request({
        url: '/roles/updateRoles.php',
        method: 'get',
        params
    })
}