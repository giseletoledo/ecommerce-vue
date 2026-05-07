import { createRouter, createWebHistory } from 'vue-router'
import ConsumerLayout from '../layouts/ConsumerLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const routes = [
  // ── Autenticação ──────────────────────────────────────
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { guestOnly: true },
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/AdminLoginView.vue'),
    meta: { guestOnly: true },
  },

  // ── Área do consumidor ────────────────────────────────
  {
    path: '/',
    component: ConsumerLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'product/:id',
        name: 'product-detail',
        component: () => import('../views/ProductDetailView.vue'),
        props: true,
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('../views/CheckoutView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // ── Área administrativa ───────────────────────────────
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'ADMIN' },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('../views/admin/AdminDashboard.vue'),
        meta: { breadcrumb: 'Dashboard Admin' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ── Guard global ──────────────────────────────────────────
// Lê direto do localStorage para não depender do ciclo do Pinia aqui
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('auth_token')
  const userRaw = localStorage.getItem('auth_user')
  const role = userRaw ? JSON.parse(userRaw).role : null
  const isAuth = !!token

  // Rota exclusiva para visitantes (ex: /login) — redireciona quem já está logado
  if (to.meta.guestOnly && isAuth) {
    next(role === 'ADMIN' ? '/admin' : '/')
    return
  }

  // Rota protegida — precisa estar logado
  if (to.meta.requiresAuth && !isAuth) {
    if (to.meta.role === 'ADMIN') {
      next({ name: 'admin-login' })
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
    return
  }

  // Rota de admin — precisa ter role ADMIN
  if (to.meta.role === 'ADMIN' && role !== 'ADMIN') {
    next({ name: 'admin-login' })
    return
  }

  next()
})

export default router