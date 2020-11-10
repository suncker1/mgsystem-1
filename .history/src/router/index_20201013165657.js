import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/repository',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Repository',
        component: () => import('@/views/repository/index'),
        meta: { title: 'Repository', icon: 'el-icon-notebook-2' }
      }
    ]
  },
  {
    path: '/shiftManagement',
    component: Layout,
    name: 'Shift Management',
    meta: {
      title: 'Shift Management',
      icon: 'el-icon-s-claim'
    },
    children: [
      {
        path: 'shift',
        component: () => import('@/views/shiftManagement/shift'),
        name: 'Shift',
        meta: { title: 'Shift', icon: 'el-icon-s-order' }
      },
      {
        path: 'calendar',
        component: () => import('@/views/shiftManagement/calendar'),
        name: 'Calendar',
        meta: { title: 'Calendar', icon: 'el-icon-date' }
      },
      {
        path: 'approval',
        component: () => import('@/views/shiftManagement/approval'),
        name: 'Approval',
        meta: { title: 'Approval', icon: 'el-icon-s-check' }
      }
    ]
  },
  {
    path: '/teamManagement',
    component: Layout,
    name: 'Team Management',
    meta: {
      title: 'Team Management',
      icon: 'nested'
    },
    children: [
      {
        path: 'department',
        component: () => import('@/views/teamManagement/department'),
        name: 'Department',
        meta: { title: 'Department', icon: 'el-icon-s-grid' }
      },
      {
        path: 'employee',
        component: () => import('@/views/teamManagement/employee'),
        name: 'Employee',
        meta: { title: 'Employee', icon: 'el-icon-s-custom' }
      },
      {
        path: 'institutionalTree',
        component: () => import('@/views/teamManagement/institutionalTree'),
        name: 'Institutional Tree',
        meta: { title: 'Institutional Tree', icon: 'tree' }
      },
      {
        path: 'team',
        component: () => import('@/views/teamManagement/team'),
        name: 'Team',
        meta: { title: 'Team', icon: 'el-icon-s-data' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
