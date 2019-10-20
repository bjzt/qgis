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
    redirect: '/index',
    children: [{
      path: '/',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/customInfo',
    component: Layout,
    redirect: '/customInfo',
    name: 'CustomInfo',
    meta: { title: '个人中心', icon: 'user' },
    children: [
      {
        path: 'main',
        name: 'Mian',
        component: () => import('@/views/customInfo/main'),
        meta: { title: '主账号' }
      },
      {
        path: 'password',
        component: () => import('@/views/business/password'),
        meta: { title: '修改密码' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/customInfo/business'),
        meta: { title: '业务流水' }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business',
    name: 'Business',
    meta: {
      title: '个人业务',
      icon: 'table'
    },
    children: [
      {
        path: 'changePhone',
        component: () => import('@/views/business/changePhone'),
        meta: { title: '坐标转换联系人变更申请' }
      },
      {
        path: 'staticData',
        component: () => import('@/views/business/staticData'),
        meta: { title: '静态数据处理申请' }
      }
    ]
  },
  {
    path: '/coordinate',
    component: Layout,
    redirect: '/coordinate',
    name: 'Nested',
    meta: {
      title: '坐标转换',
      icon: 'nested'
    },
    children: [
      {
        path: 'onLine',
        component: () => import('@/views/coordinate/onLine'), 
        name: 'OnLine',
        meta: { title: '在线坐标转换' }
      },
      {
        path: 'history',
        component: () => import('@/views/coordinate/history'),
        meta: { title: '查询历史记录' }
      }
    ]
  },

// ]
// //需要权限动态挂载的路由
// export const asyncRouterMap = [
  {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage',
    name: 'SystemManage',
    meta: {
      role: ['admin'],
      title: '系统管理',
      icon: 'example'
    },
    children: [
      {
        path: 'customerManage',
        component: () => import('@/views/system/customerManage'),
        name: 'OnLine',
        meta: { role: ['admin'],title: '客户管理' }
      },
      {
        path: 'history',
        component: () => import('@/views/system/linkPhoneManage'),
        meta: { role: ['admin'],title: '客户联系人管理' }
      },
      {
        path: 'log',
        component: () => import('@/views/system/logManage'),
        meta: { role: ['admin'],title: '系统日志管理' }
      },

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
