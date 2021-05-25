/**
 * 侧边栏收缩状态
 */
const sideCollapsed = window.localStorage.getItem('sideCollapsed') ? true : false;

export default {
  sideCollapsed,
};
