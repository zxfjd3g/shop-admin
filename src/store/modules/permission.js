import { constantRoutes } from '@/router'
import { login as loginAPI} from '@/api'
import Layout from '@/layout'

function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由组件字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    let component = route.component
    if (component) {
      if (component!=="Layout" && component.indexOf('/')!==0) {
        component = '/' + component
      }
      // route.component = component === 'Layout' ? Layout : () => import('@/views' + component + '.vue')
      // route.component = component === 'Layout' ? Layout : () => import(`@/views${component}.vue`)
      try {
        route.component = component === 'Layout' ? Layout : require('@/views' + component + '.vue').default
      } catch (e) {
        console.log(e)
        return false
      }
      
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

const state = {
  routes: [], // 常量路由 + 权限路由数组
  asyncRoutes: [] // 当前用户的权限路由数组
}

const mutations = {
  ADD_ASYNC_ROUTES: (state, asyncRoutes) => {
    state.asyncRoutes = asyncRoutes
    state.routes = constantRoutes.concat(asyncRoutes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    
    // const result = await loginAPI.getMenu()
    // const permissionList = result.data.permissionList
    // const asyncRoutes = filterAsyncRouter(permissionList)

    // commit('SET_ROUTES', asyncRoutes)
    // return asyncRoutes
    return new Promise(async resolve => {
      const result = await loginAPI.getMenu()
      const permissionList = result.data.permissionList
      const asyncRoutes = filterAsyncRouter(permissionList)

      commit('ADD_ASYNC_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
