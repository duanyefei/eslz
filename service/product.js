let httpUtil = require('../utils/http')
let config = require('../config')

let serverUrl = config.server
let server = httpUtil.server(serverUrl)

//发布接口
function  fbcs(data){
    return server.post('/fbcs', data)
}

//卖家列表
function getSellList(page, limit, openid) {
    return server.get('/seller_list', {page, limit,openid})
}

//添加卖家
function sellerAdd(data){
    return server.post('/seller_add', data)
}

//编辑卖家
function sellerEdit(data) {
    return server.post('/seller_modify', data)
}

//商品列表
function getGoodsList(page, limit) {
    return server.get('/get_second_hand_list', {page, limit})
}

//商品分类列表
function getTypeList() {
    return server.get('/get_menu_cate')
}

//反馈
function postFeedback(data) {
    return server.post('/second_hand_feedback', data)
}

//实名认证
function postRealname(data) {
    return server.post('/realname_auth', data)
}

module.exports = {
        fbcs,
        getSellList,
        sellerAdd,
        sellerEdit,
        getGoodsList,
        getTypeList,
        postFeedback,
        postRealname,
}
