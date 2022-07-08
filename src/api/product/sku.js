import request from '@/utils/request'
// /admin/product/spuImageList/{spuId} get 获取图片列表数据
export const reqGetSpuImageList = (spuId) => {
    return request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })
}
// /admin/product/spuSaleAttrList/{spuId} get 获取销售属性列表数据
export const reqGetSpuSaleAttrList = (spuId) => {
    return request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })
}
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get 获取属性信息数据
export const reqGetattrInfoList = (category1Id, category2Id, category3Id) => {
    return request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })
}
// /admin/product/saveSkuInfo post 添加sku
export const reqAddSkuInfo = (skuInfo)=>{
    return request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})
}
// /admin/product/findBySpuId/{spuId} 查询sku属性
export const reqSearchSkuBySpuId = (spuId)=>{
    return request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
}
// 
// 获取sku列表 /admin/product/list/{page}/{limit}
export const reqGetSkuList = (page,limit)=>{
    return request({url:`/admin/product/list/${page}/${limit}`,method:'get'})
} 
// 上架sku /admin/product/onSale/{skuId}
export const reqOnSaleSku = (skuId)=>{
    return request({url:`/admin/product/onSale/${skuId}`,method:'get'})
}
// 下架sku /admin/product/cancelSale/{skuId}
export const reqCancelSaleSku = (skuId)=>{
    return request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})
}
// 获取skuInfo详情的接口
export const reqGetSkuInfoDetail = (skuId)=>{
    return request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})
}