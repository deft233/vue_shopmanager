import Mockrequest from '@/utils/MockRequest'
const state = {
    list:{}
};
const actions = {
   async getData({commit}){
      let result = await Mockrequest({url:"/home/list",method:'get'})
      if(result.code === 20000){
        commit('GETDATA',result.data)
      }
    }
};
const mutations = {
    GETDATA(state,list){
        state.list = list
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}


