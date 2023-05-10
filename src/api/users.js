import request from '@/utils/request.js'

//获取用户数据
export function allUsers(params) {
    return request({
        url: '/users/getAllUsers.php',
        method: 'get',
        params
    })
}

//添加用户
export function addUser(params) {
    return request({
        url: '/users/addUsers.php',
        params
    })
}

//修改
export function oneUser(params) {
    return request({
        url: '/users/getOneUsers.php',
        params
    })
}

export function upUser(params) {
    return request({
        url: '/users/updateUsers.php',
        params
    })
}

//删除
export function delUser(params) {
    return request({
        url: '/users/delUsers.php',
        params
    })
}