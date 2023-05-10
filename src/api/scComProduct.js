import request from '@/utils/request.js'

//获取子公司产品
export function allProduct(params) {
    return request({
        url: '/scComProduct/getAllProduct.php',
        params
    })
}

//添加产品
export function addProduct(data) {
    return request({
        url: '/scComProduct/addProduct.php',
        method: 'post',
        data
    })
}

//删除
export function delProduct(params) {
    return request({
        url: '/scComProduct/delProduct.php',
        params
    })
}

//获取一个
export function oneProduct(params) {
    return request({
        url: '/scComProduct/getOneProduct.php',
        method: 'GET',
        params
    })
}

//产品修改
export function upProduct(data) {
    return request({
        url: '/scComProduct/updateProduct.php',
        method: 'post',
        data
    })
}