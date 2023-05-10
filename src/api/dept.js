import request from '@/utils/request.js'

//获取所有部门
export function allDept() {
    return request({
        url: '/dept/getAllDept.php',
        method: 'get',
    })
}

//添加部门
export function addDept(params) {
    return request({
        url: '/dept/addDept.php',
        method: 'get',
        params
    })
}

//删除
export function delDept(params) {
    return request({
        url: '/dept/delDept.php',
        method: 'get',
        params
    })
}

//修改
export function oneDept(params) {
    return request({
        url: '/dept/getOneDept.php',
        params
    })
}

export function updateDept(params) {
    return request({
        url: '/dept/updateDept.php',
        method: 'get',
        params
    })
}