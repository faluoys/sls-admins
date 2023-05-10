import request from '@/utils/request.js'

//获取所有公司数据
export function allSc() {
    return request({
        url: '/sonCom/getAllSC.php',
        method: 'get'
    })
}

//添加
export function addSc(data) {
    return request({
        url: '/sonCom/addSC.php',
        method: 'post',
        data
    })
}

//删除
export function delSc(params) {
    return request({
        url: '/sonCom/delSC.php',
        method: 'get',
        params
    })
}

//修改
export function oneSc(params) {
    return request({
        url: '/sonCom/getOneSC.php',
        params
    })
}

export function upSc(data) {
    return request({
        url: '/sonCom/updateSC.php',
        method: 'post',
        data
    })
}