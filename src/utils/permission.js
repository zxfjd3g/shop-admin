import store from '@/store'

/**
 * 判断当前用户是否有此按钮权限
 * @param {按钮权限字符串} permission 
 */
export function hasBtnPermission(permission) {
  const myBtns = store.getters.buttons
  return myBtns.indexOf(permission) !== -1
}
