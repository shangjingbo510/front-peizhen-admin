const getters = {
  enumList: state => state.app.enumList,
  token: state => state.user.token,
  keepAlive: state => state.user.keepAlive,
  routers: state => state.permission.routers,
  activeLeftMenu: state => state.permission.activeLeftMenu
}
export default getters
