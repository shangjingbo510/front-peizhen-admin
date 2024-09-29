export function getRouterBreadcrumb(rs) {
  let matched = rs.matched.filter(item => item.meta && item.meta.title)
  const levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
  return levelList
}

function isDashboard(route) {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
