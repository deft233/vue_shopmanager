import request from '@/utils/request';
// GET /admin/product/getCategory1 获取全部一级分类
export const reqGetCategory1 = ()=>{
    return request({url:`/admin/product/getCategory1`,method:'get'})
}
// GET /admin/product/getCategory2/{category1Id} 获取全部二级分类
export const reqGetCategory2 = (category1Id)=>{
    return request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})
}
// GET /admin/product/getCategory3/{category2Id} 获取全部三级分类
export const reqGetCategory3 = (category2Id)=>{
    return request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})
}
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 平台商品详细信息
export const reqGetAttrInfoList = ({category1Id,category2Id,category3Id})=>{
    return request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})
}
// POST /admin/product/saveAttrInfo 添加属性与属性值接口
export const reqAddAttr = (data)=>{
    return request({url:`/admin/product/saveAttrInfo`,method:'post',data})
}