import { logout, userlogin, getuserInfo, getTemplate } from '@/api/user'

import { getToken, setToken, removeToken, getAppID } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  AppId: getAppID(),
  avatar: '',
  server: '',
  introduction: '',
  roles: [],
  temp: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_APPID: (state, AppId) => {
    state.AppId = AppId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_SERVER: (state, server) => {
    state.server = server
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TEMP: (state, temp) => {
    state.temp = temp
  }

}

const actions = {

  login({ commit }, userInfo) {
    const { userAccount, userPassword } = userInfo
    return new Promise((resolve, reject) => {
      userlogin({ userAccount: userAccount, userPassword: userPassword }).then(response => {
        // commit('SET_TOKEN', response.token)
        commit('SET_TOKEN', response.data.token)

        // setToken(response.token)
        setToken(response.data.token)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  //   get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getuserInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('无用户信息，登录失败')
        }
        if (!data.userNickname) {
          reject('无用户角色，登录失败')
        }
        commit('SET_NAME', data.realName)
        // commit('SET_ROLES', data.realname)
        commit('SET_ROLES', 'super_admin')
        // resolve(data.realname)
        resolve('super_admin')
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTempInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getTemplate().then(response => {
        const { data } = response
        commit('SET_TEMP', data)
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
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAME', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  typeSelect({ commit, state }, serverType) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   commit('SET_SERVER', serverType)
      //   resolve(serverType)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

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
