import request from '@/utils/request'
// GET /admin/product/{page}/{limit} 三个参数 page limit category3Id
export const reqGetSpuInfo = (page, limit, category3Id) => {
    return request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
}
// GET /admin/product/getSpuById/{spuId} 获取spu基本信息
export const reqGetSpuInfoById = (spuId) => {
    return request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
}
// GET /admin/product/baseSaleAttrList 获取销售属性
export const reqGetSaleAttr = () => {
    return request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })
}
// /admin/product/spuImageList/{spuId} 获取图片
export const reqGetSpuImageById = (spuId) => {
    return request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
}
// /admin/product/baseTrademark/getTrademarkList 获取品牌列表
export const reqGetTradeMarkList = () => {
    return request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })
}
// 修改或者添加spu /admin/product/updateSpuInfo
export const reqAddOrUpdateSpu = (spuInfo)=>{
    if(spuInfo.id){
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}
// 删除spu /admin/product/deleteSpu/{spuId}
export const reqDeleteSpuById = (spuId)=>{
    return request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})
}