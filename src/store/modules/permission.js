import {getMenu} from '@/api/user'
import router, {initRoutes, MPR} from '@/router/index'
import {recursionRouter, setDefaultRoute} from '@/utils/recursion-router'
import {dynamicRoutes} from "@/router/dynamic-router"
import {getToken, clearToken} from '@/utils/auth'
import {Message} from 'element-ui'

function menuDeal(data){
    data.forEach(item => {
        if(item.menuName == '视频管理'){
            item.childList.push({
                menuName: "视频上传"
            })
        }
        if(item.menuName == '合伙人管理'){
            item.childList.push({
                menuName: "合伙人编辑"
            },{
                menuName: "审核详细"
            })
        }
        if(item.menuName == '专家管理'){
            item.childList.push({
                menuName: "编辑专家"
            },{
                menuName: "审核详细"
            })
        }
        if(item.menuName == '客户管理'){
            item.childList.push({
                menuName: "编辑客户"
            })
        }
        if(item.menuName == '业务管理'){
            item.childList.push({
                menuName: "修改业务"
            })
        }
        if(item.menuName == '服务管理'){
            item.childList.push({
                menuName: "编辑服务类别"
            },{
                menuName: "编辑合同模版"
            },{
                menuName: "修改客户服务申请"
            },{
                menuName: "查看客户服务申请详情"
            })
        }
        let obj = item.childList.find(subItem => subItem.menuName == '服务阶段管理');
        if(obj){
            obj.childList.push({
                menuName: "服务启动管理详情"
            },{
                menuName: "服务洽谈管理详情"
            },{
                menuName: "服务签约管理详情"
            },{
                menuName: "服务设计管理详情"
            },{
                menuName: "服务实施管理详情"
            },{
                menuName: "服务达成管理详情"
            })
        }
    })
    return data;
}

export default {
    namespaced: true,
    state: {
        permissionList: null /** 所有路由 */,
        sidebarMenu: [] /** 保单查验左侧菜单 */,
        sidebarCurrentMenu: '' /** 保单查验 左侧active导航菜单 */,
    },
    getters: {},
    mutations: {
        SET_PERMISSION(state, routes) {
            state.permissionList = routes
        },
        CLEAR_PERMISSION(state) {
            state.permissionList = null
        },
        SET_MENU(state, menu) {
            state.sidebarMenu = menu
        },
        SET_SIDEBAR_CURRENT_MENU(state, sidebarCurrentMenu) {
            let str = sidebarCurrentMenu.replace(/Detail/, '').replace(/Edit/, '');
            state.sidebarCurrentMenu = str
        },
        CLEAR_MENU(state) {
            state.sidebarMenu = []
        }
    },
    actions: {
        async FETCH_PERMISSION({commit}) {
            let res = await getMenu()
            let routesList = []
            if (res && res.code === 1) {
                let _routesList = await menuDeal(res.data)
                routesList = _routesList
            } else {
                Message.error({
                    message: (res ? res.message : 'token失效，请重新登录！'),
                    showClose: true,
                    type: 'error',
                    duration: 1000,
                    offset: 100
                })
                clearToken()
                window.location.reload()
                return false;
            }

            /*  根据权限筛选出我们设置好的路由并加入到path='/'的children */
            let MainContainer = initRoutes.find(v => v.path === '/')
            //保单查验的路由
            let routes = recursionRouter(routesList, dynamicRoutes, MPR)
            // let routes = dynamicRoutes
            //先清空，在追加，防止重复添加
            MainContainer.children = []
            MainContainer.children.push(...routes)
            /* 生成保单查验左侧菜单 */
            commit('SET_MENU', MainContainer.children)

            /*
                为所有有children的菜单路由设置第一个children为默认路由
                主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
                而我们的路由是
                [
                    /manage/menu1,
                    /manage/menu2
                ]
            */
            if (MainContainer.children.length) {
                MainContainer.redirect = {name: MainContainer.children[0].name}
            }
            setDefaultRoute([MainContainer])

            /*  初始路由 */
            let initialRoutes = router.options.routes
            /*  动态添加路由 */
            router.addRoutes(initRoutes)
            console.log(initRoutes)

            /* 完整的路由表 */
            commit('SET_PERMISSION', [...initialRoutes, ...initRoutes])
        }
    }
}
