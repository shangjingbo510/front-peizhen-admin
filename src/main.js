// import Vue from 'vue'
import '@/styles/index.scss' // global css
// import './assets/font/iconfont.css'

import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from "@/utils/get-page-title"; // button permission

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon

import comMessage from '@/mixins/message'
Vue.use(comMessage)

import { getRowClass } from '@/utils/common'
Vue.prototype.$getRowClass = getRowClass
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    document.title = getPageTitle(to.meta.title)

    if (!getToken('token')) {
        if (to.matched.length > 0) {
            next()
        } else {
            next({path: '/login'})
        }
    } else {
        if (!store.state.permission.permissionList) {
            store.dispatch('permission/FETCH_PERMISSION').then(() => {
                next({path: to.path})
            })
        } else {
            if (to.path !== '/login') {
                next()
            } else {
                next()
            }
        }
    }
})

router.afterEach((to, from, next) => {
    //var routerList = to.matched
    //设置面包屑导航
    //store.commit('setCrumbList', routerList)
    store.commit('permission/SET_SIDEBAR_CURRENT_MENU', to.name)
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
