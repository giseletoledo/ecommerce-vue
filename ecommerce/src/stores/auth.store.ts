import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

// Simulação de banco — substitua por POST /api/auth/* quando tiver backend Node
const MOCK_USERS: Array<AuthUser & { password: string }> = [
  {
    id: '1',
    name: 'Admin',
    email: import.meta.env.VITE_ADMIN_EMAIL ?? 'admin@vueshop.com',
    password: import.meta.env.VITE_ADMIN_PASS ?? 'admin123',
    role: 'ADMIN',
  },
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  // ─── Persistência ─────────────────────────────────────
  function hydrate() {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  function persist() {
    if (token.value && user.value) {
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('auth_user', JSON.stringify(user.value))
    }
  }

  function clearPersist() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    localStorage.removeItem('user_role') // compatibilidade com código legado
  }

  // ─── Actions ──────────────────────────────────────────
  async function login(email: string, password: string): Promise<void> {
    loading.value = true
    await new Promise(r => setTimeout(r, 800)) // simula latência — remover com backend Node

    // TODO: substituir por:
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })
    // if (!res.ok) throw new Error('E-mail ou senha inválidos.')
    // const { user: userData, token: jwt } = await res.json()

    const found = MOCK_USERS.find(u => u.email === email && u.password === password)

    if (!found) {
      loading.value = false
      throw new Error('E-mail ou senha inválidos.')
    }

    const { password: _pwd, ...userData } = found
    user.value = userData
    token.value = `mock-jwt-${userData.id}-${Date.now()}`
    persist()
    loading.value = false
  }

  async function register(name: string, email: string, password: string): Promise<void> {
    loading.value = true
    await new Promise(r => setTimeout(r, 800)) // simula latência — remover com backend Node

    // TODO: substituir por:
    // const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password }),
    // })
    // if (!res.ok) { const { message } = await res.json(); throw new Error(message) }
    // const { user: userData, token: jwt } = await res.json()

    const exists = MOCK_USERS.find(u => u.email === email)
    if (exists) {
      loading.value = false
      throw new Error('Este e-mail já está cadastrado.')
    }

    const newUser: AuthUser & { password: string } = {
      id: String(Date.now()),
      name,
      email,
      password,
      role: 'USER',
    }
    MOCK_USERS.push(newUser)

    const { password: _pwd, ...userData } = newUser
    user.value = userData
    token.value = `mock-jwt-${userData.id}-${Date.now()}`
    persist()
    loading.value = false
  }

  function logout() {
    user.value = null
    token.value = null
    clearPersist()
  }

  hydrate() // restaura sessão ao iniciar

  return { user, token, loading, isAuthenticated, isAdmin, login, register, logout }
})