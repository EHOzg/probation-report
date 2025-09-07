import { createRouter, createWebHistory } from 'vue-router'

// 定义路由页面
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import('../views/Work/index.vue'), // 工作总结
  },
  {
    path: '/evaluate',
    name: 'Evaluate',
    component: () => import('../views/Evaluate/index.vue'), // 评价
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('../views/Experience/index.vue'), // 体会
  },
  {
    path: '/plan',
    name: 'Plan',
    component: () => import('../views/Plan/index.vue'), // 计划
  },
]

// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
