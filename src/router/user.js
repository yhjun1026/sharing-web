/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：vue-seed-master
 * 文件名：test
 * 模块说明：
 * 修改历史：
 * 2018/4/16 - lihuiming - 创建
 */

const Layout = () => import('@/views/Layout/Layout')
// const ProjectInfo = () => import('@/views/ProjectInfo/ProjectInfo')
const UserleList = () => import('@/views/User/user-list');
const Userdetail = () => import('@/views/User/user-detail');
const Usernew = () => import('@/views/User/user-new');
// const Cube1 = () => import('@/views/borrowandback/Cube')
export default // 然后就是嵌套路由了，也就是登陆后的各个页面
{
  path: '/',
  meta: {
    requireAuth: true
  },
  component: Layout,
  //redirect: '/project-info', //重定向到第一个子路由，否则只渲染Layout组件
  children: [
    {
      path: '/user/userdetail',
      meta: {requireAuth: true},
      component: Userdetail
    },
    {
      path: '/user/userlist',
      meta: {requireAuth: true},
      component: UserleList
    },
    {
      path: '/user/usernew',
      meta: {requireAuth: true},
      component: Usernew
    }
  ]
}
