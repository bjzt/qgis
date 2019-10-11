import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/forget',
    component: () => import('@/views/register/forget'),
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
    path: '/customInfo',
    component: Layout,
    redirect: '/customInfo',
    name: 'Example',
    meta: { title: '个人中心', icon: 'example' },
    children: [
      {
        path: 'main',
        name: 'Mian',
        component: () => import('@/views/customInfo/main'),
        meta: { title: '主账号' }
      },
      {
        path: 'rtkmain',
        name: 'RTKMain',
        component: () => import('@/views/customInfo/RTKmain'),
        meta: { title: 'RTK账号' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/customInfo/business'),
        meta: { title: '业务流水' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/customInfo/RTKposition'),
        meta: { title: 'RTK位置' }
      }
    ]
  },
  {
    path: '/nested1',
    component: Layout,
    redirect: '/nested/one',
    name: 'one',
    meta: {
      title: '个人业务',
      icon: 'table'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '办理进度' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '坐标转换联系人变更申请' }
      },
      {
        path: 'menu3',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'RTK密码修改处理申请' }
      },
      {
        path: 'menu4',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '静态数据处理申请' }
      }
    ]
  },
  {
    path: '/nested2',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '坐标转换',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '在线坐标转换' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '查询历史记录' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '业务查询',
      icon: 'table'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '售后管理' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '售后分析' }
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
