import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'

/* Layout */

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
    icon: 'svg-name'             the icon show in the sidebar
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
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '剁手商城后台管理系统', icon: 'nav' }
      }
    ]
  },

  {
    path: '/users',
    component: Layout,
    redirect: '/users/list',
    name: 'Users',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'users-list',
        name: 'UsersList',
        component: () => import('@/views/user/UsersList'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'user-info/:id',
        name: 'UserInfo',
        component: () => import('@/views/user/UserInfo'),
        meta: { title: '用户信息', icon: 'table' },
        hidden: true
      },
      {
        path: 'add-user',
        name: 'AddUser',
        component: () => import('@/views/user/AddUser'),
        meta: { title: '新增用户', icon: 'table' }
      }
    ]
  },
  {
    path: '/products',
    component: Layout,
    redirect: '/products/list',
    name: 'Products',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'products-list',
        name: 'ProductsList',
        component: () => import('@/views/product/ProductsList'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'product-details',
        name: 'ProductDetails',
        component: () => import('@/views/product/ProductDetails'),
        meta: { title: '商品详情', icon: 'table' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/productList/index.vue',
    name: 'nested',
    meta: {
      title: '商品分类管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'pro-list',
        name: 'ProductList',
        component: () => import('@/views/nested/productList/index'), // Parent router-view
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'addproduct',
        name: 'addProduct',
        component: () => import('@/views/nested/addProduct/index'),
        meta: { title: '添加商品', icon: 'table' }
      },
      {
        path: 'edit',
        component: () => import('@/views/nested/form/index'),
        name: 'editProduct',
        meta: { title: '修改商品', icon: 'table' },
        hidden:true
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/info',
    name: 'Personal',
    meta: { title: '超级管理员', icon: 'example' },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/personal/index'),
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/productadmin',
    component: Layout,
    redirect: '/productadmin/table',
    name: 'ProductAdmin',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'prolist',
        name: 'ProList',
        component: () => import('@/views/ProductAdmin/ProList/index.vue'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: '/editproduct/index',
        name: 'EditProduct',
        component: () => import('@/views/ProductAdmin/EditProduct/index'),
        meta: { title: '修改商品信息', icon: 'form' },
        hidden:true
      },
      {
        path: '/addproduct/index',
        name: 'AddProduct',
        component: () => import('@/views/ProductAdmin/AddProduct/index'),
        meta: { title: '添加商品', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/categoryList',
    name: 'Nested',
    meta: {
      title: '商品分类',
      icon: 'nested'
    },
    children: [
      {
        path: 'categorylist',
        component: () => import('@/views/nested/categoryList/ProductCat'), // Parent router-view
        name: 'categoryList',
        meta: { title: '商品分类列表' }
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

const createRouter = () =>
  new Router({
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
