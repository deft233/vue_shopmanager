import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // { path: '*', redirect: '/404', hidden: true },
]
// 异步路由
export const asyncRouters = [
  {
    path: '/acl',
    name: 'Acl',
    component: Layout,
    redirect: '/acl/user/list',
    children: [
      {
        path: 'permission/list',
        name: 'Permission',
        component: () => import('@/views/acl/permission/list.vue'),
        meta: { title: 'permission', icon: 'el-icon-goods' }
      },
      {
        path: 'user/list',
        name: 'User',
        component: () => import('@/views/acl/user/list.vue'),
        meta: { title: 'user', icon: 'el-icon-goods' }
      },
      {
        path: 'role/list',
        name: 'Role',
        component: () => import('@/views/acl/role/list.vue'),
        meta: { title: 'role', icon: 'el-icon-goods' }
      },
      {

        path: 'role/auth/:id',
        name: 'RoleAuth',
        component: () => import('@/views/acl/role/roleAuth.vue'),
        // meta: { title: 'roleAuth', icon: 'el-icon-goods' }
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,

      },

    ],
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'Sku',
        name: 'Sku',
        component: () => import('@/views/product/Sku'),
        meta: { title: 'Sku', icon: 'el-icon-goods' }
      },
      {
        path: 'Spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
        meta: { title: 'Spu', icon: 'el-icon-goods' }
      },
      {
        path: 'TradeMark',
        name: 'TradeMark',
        component: () => import('@/views/product/TradeMark'),
        meta: { title: 'TradeMark', icon: 'el-icon-goods' }
      },
      {
        path: 'Attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr'),
        meta: { title: '平台属性管理', icon: 'el-icon-goods' }
      }
    ],
    meta: { title: 'Product', icon: 'el-icon-goods' }
  },
  {
    path: '/test1',
    name: 'Test1',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'testF',
        name: 'Test1',
        component: () => import('@/views/test/test1'),
        meta: { title: 'test1', icon: 'el-icon-goods' }
      },
      {
        path: 'testS',
        name: 'Test1',
        component: () => import('@/views/test/test2'),
        meta: { title: 'test2', icon: 'el-icon-goods' }
      },
      
    ],
    meta: { title: 'Test', icon: 'el-icon-goods' }
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
// router.$addRoutes = (params) =>{
// // 清空之前的路由
//   resetRouter()
//   router.addRoutes(params);
// }
export default router
