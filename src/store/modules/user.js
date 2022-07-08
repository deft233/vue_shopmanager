import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRouters, constantRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    buttons: [],
    roles: [],
    routes: [],
    // 最终经过计算的异步路由
    resultAllRoutes: [],
    // 最终展示的全部路由
    resultRoutes: []
  }
}
const compareRoutes = (routes, asyncRouters) => {
  // console.log(routes);
  // console.log(asyncRouters);
  return asyncRouters.filter(item => {
    // console.log(item);
    if (routes.indexOf(item.name) !== -1) {
      if(item.children&&item.children.length!==0){
        item.children = compareRoutes(routes,item.children)
      }
      return true
    }
  })
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    // 
    state.routes = userInfo.routes;
    // 
    state.roles = userInfo.roles;
    // 
    state.buttons = userInfo.buttons;
  },
  // 
  SET_RESULTALLROUTES: (state, resultAllRoutes) => {
    state.resultAllRoutes = resultAllRoutes
    // 合并路由 并添加路由addRoutes
    state.resultRoutes = constantRoutes.concat(resultAllRoutes);
    console.log(state.resultRoutes);
    router.addRoutes(state.resultRoutes)
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // console.log(result.data);
    if (result.code == 20000) {
      // 保存token
      commit('SET_TOKEN', result.data.token)
      // token的持久化
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject('fail')
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        // console.log(response);
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // const { name, avatar } = data
        commit('SET_USERINFO', data)
        // commit('SET_AVATAR', avatar)
        // 路由的比对 最终需要展示的路由 计算过后的路由
        commit('SET_RESULTALLROUTES', compareRoutes(state.routes, asyncRouters))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

