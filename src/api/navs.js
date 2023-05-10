import request from '@/utils/request.js'


//获取所有用户
export function allNav() {
    return request({
        url: '/nav/getAllNav.php',
        method: 'get',
    })
}

//新增
export function addNav(params) {
    return request({
        url: '/nav/addNav.php',
        method: 'get',
        params
    })
}

//删除
export function delNav(params) {
    return request({
        url: `/nav/delNav.php`,
        method: 'get',
        params
    })
}



//修改

export function oneNav(params) {
    return request({
        url: '/nav/getOneNav.php',
        method: 'get',
        params
    })
}

export function upNav(params) {
    return request({
        url: `/nav/updateNav.php`,
        method: 'get',
        params
    })
}