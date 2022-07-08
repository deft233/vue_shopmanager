# vue-admin-template

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** http://panjiachen.github.io/vue-admin-template


**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**

<p align="center">
  <b>SPONSORED BY</b>
</p>
<p align="center">
   <a href="https://finclip.com?from=vue_element" title="FinClip" target="_blank">
      <img height="200px" src="https://gitee.com/panjiachen/gitee-cdn/raw/master/vue%E8%B5%9E%E5%8A%A9.png" title="FinClip">
   </a>
</p>

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))

## Related Project

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen
##
关于权限管理模块
权限：超级管理员可以看到全部路由内容，其他角色却无法看到
如何实现？
此时我们的路由组件是将路由配置写死了，因此无论我们登录什么账号，可以操作的路由内容都是所写的路由配置
当我们使用不同角色身份登录时，服务器就应该会返回不同的路由权限相关的数据内容，我们要根据这返回的内容定制化路由
服务器返回的内容在哪里？
vuex user模块的actions中getInfo 发送请求获取权限相关数据
permission.js 前置路由守卫，进入首页时触发getInfo 获取登录的用户所拥有权限的相关信息
此时我们的路由器 router.js中的路由就要进行划分了
一般分为通常路由 异步路由(根据用户权限决定) 和任意路由
定义一个方法 将用户所拥有的权限与异步路由比对，筛选出用户所能使用的路由，注意还有二级路由三级路由等子路由需要进行筛选，因此需要递归调用该方法，最后将筛选后的异步路由与常态路由合并，使用addRoutes添加路由，再进行v-for展示

关于addRoutes添加路由后刷新白屏问题
vuex不是持久化的，刷新后数据会丢失，因此动态添加的路由无法展示，所以在路由守卫处要添加一个判断，判断是否是刷新页面，如果是刷新页面，再次添加路由 next(to)守卫放行 

关于为什么用next(to) 而不能直接next();
首先我们要搞清除这俩的区别，路由守卫中只有next()是直接放行，next(to)、next('/login')等都是中断当前路由，跳转到指定参数的路由，会重新进路由守卫而不是放行到对应路由，因此，一定需要一个next()来放行，否则会死循环。
然后，不能直接next()放行的原因是我们addRoutes的方法获取权限是异步操作，不会阻塞next()执行，因此在放行的时候，很有可能我们匹配的路由还没add进去，所以放行找不到对应路由导致白屏或者404，因此需要再次进入路由守卫，然后判断是否成功添加到store
**即使添加路由的操作不是异步也会导致这个问题，应该是addRoutes方法的问题，会导致刚刚添加的路由直接next()找不到路由。

关于addRoutes后报路由重复警告问题
重写addRoutes 在addRoutes之前重置当前路由

关于addRoutes后，退出登录再次登录其他权限用户展示权限不对应问题
退出登录时还保留了仓库store相关路由，再次登录时addRoutes只会在原有路由基础上添加，并不会清空路由再添加，因此在退出时应该清空store相关路由 RESET_STATE

关于添加按钮权限问题
v-show or v-if 判断是否包含返回的buttons权限 直接从store拿 有则按钮权限可用