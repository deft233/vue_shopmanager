import request from '@/utils/request';
// GET /admin/product/baseTrademark/{page}/{limit} 获取分页信息
export const reqGetPagenations = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })
// POST /admin/product/baseTrademark/save 新增商品信息
// PUT /admin/product/baseTrademark/update 修改商品信息 必须含有id
export const addOrUpdateGoodsInfo = (trademark) => {
    // 是否含有id判断是否是修改信息
    if (trademark.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: trademark })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: trademark })
    }
}
// 根据id删除商品 DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMarkById = (id)=>{
    return request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
}