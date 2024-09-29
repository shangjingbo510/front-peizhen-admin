import {login, logout} from '@/api/user'
import {getToken, setToken, delCookie} from '@/utils/auth'
import {Message} from 'element-ui'

const user = {
    state: {
        token: getToken('token'),
        keepAlive: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_KEEP_ALIVE: (state, keepAlive) => {
            state.keepAlive = keepAlive
        }
    },
    actions: {
        // 登录
        Login({commit}, userInfo) {
            return new Promise(async (resolve, reject) => {
                let res = await login(userInfo)
                if (res.code === 1) {
                    setToken('account', res.data.account)
                    setToken('userId', res.data.userId)
                    setToken('token', res.data.token)
                    resolve()
                } else {
                    Message.error({
                        message: res.message,
                        showClose: true,
                        type: 'error',
                        duration: 1000,
                        offset: 100
                    })
                    reject('登录失败，请重新登录')
                }
            })
        },

        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout();
                commit('permission/CLEAR_MENU')
                commit('permission/CLEAR_PERMISSION')
                delCookie()
                sessionStorage.clear()
                localStorage.clear()
                resolve()
            })
        }
    }
}


export default user
