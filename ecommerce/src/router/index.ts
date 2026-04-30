import { createRouter, createWebHistory } from 'vue-router'
import ConsumerLayout from '../layouts/ConsumerLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Mock de autenticação (sem Pinia)
const isAuthenticated = () => {
  return localStorage.getItem('user_role') !== null
}

const getUserRole = () => {
  return localStorage.getItem('user_role')
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    component: ConsumerLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'product/:id',
        name: 'product-detail',
        component: () => import('../views/ProductDetailView.vue'),
        props: true
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('../views/CheckoutView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'ADMIN' },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('../views/admin/AdminDashboard.vue'),
        meta: { breadcrumb: 'Dashboard Admin' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard global
router.beforeEach((to, from, next) => {
  const auth = isAuthenticated()
  const role = getUserRole()
  
  if (to.meta.requiresAuth && !auth) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  if (to.meta.role === 'ADMIN' && role !== 'ADMIN') {
    next({ name: 'home' })
    return
  }
  
  next()
})

export default router