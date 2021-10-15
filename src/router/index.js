import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login";
import Main from "@/views/Main";
import MemberManage from "@/components/Main/MemberManage";
import MemberStatus from "@/components/Main/MemberStatus";
import Case from "@/components/Main/Case";
import Statistics from "@/components/Main/Statistics";

const routes = [
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/member-manage',
        component: MemberManage,
        name: '成员管理',
        icon: 'el-icon-user-solid'
      },
      {
        path: '/member-status',
        component: MemberStatus,
        name: '队员状态',
        icon: 'el-icon-s-help'
      },
      {
        path: '/case',
        component: Case,
        name: '案件汇总',
        icon: 'el-icon-s-management'
      },
      {
        path: '/statistics',
        component: Statistics,
        name: '统计',
        icon: 'el-icon-s-data'
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes
})

router.beforeEach(((to, from, next) => {
  document.title = '救援管理'
  console.log(to.path)
  if(to.path === '/login') {
    next()
  }
  else {
    let token = localStorage.getItem('Authorization')

    if(token === null || token === '') {
      next(`/login?ref=${encodeURI(from.path)}`)
    }
    else {
      next()
    }
    // next()
  }
}))

export default router
