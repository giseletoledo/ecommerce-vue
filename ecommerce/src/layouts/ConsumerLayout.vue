<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">

        <RouterLink
          to="/"
          class="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight no-underline"
          style="font-family: var(--font-display)"
        >
          VueShop
        </RouterLink>

        <div class="flex items-center gap-3">

          <!-- Dark mode -->
          <Button
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            rounded text severity="secondary"
            @click="toggleDark"
          />

          <!-- Link Admin (só para admins) -->
          <RouterLink v-if="auth.isAdmin" to="/admin">
            <Button label="Admin" icon="pi pi-cog" text severity="secondary" size="small" />
          </RouterLink>

          <!-- Nome do usuário logado -->
          <span
            v-if="auth.isAuthenticated"
            class="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
          >
            <i class="pi pi-user text-xs"></i>
            {{ auth.user?.name }}
          </span>

          <!-- Logout -->
          <Button
            v-if="auth.isAuthenticated"
            icon="pi pi-sign-out"
            rounded text severity="secondary"
            v-tooltip.bottom="'Sair'"
            @click="handleLogout"
          />

          <!-- Login -->
          <Button
            v-else
            label="Entrar"
            icon="pi pi-sign-in"
            size="small" text severity="secondary"
            @click="$router.push('/login')"
          />

          <!-- Carrinho -->
          <div class="relative">
            <Button
              icon="pi pi-shopping-cart"
              rounded text severity="secondary"
              @click="cartVisible = true"
            />
            <Badge
              v-if="cart.getTotalItems() > 0"
              :value="cart.getTotalItems()"
              severity="danger"
              class="absolute -top-1 -right-1 !text-xs pointer-events-none"
            />
          </div>

        </div>
      </div>
    </header>

    <!-- Conteúdo da rota -->
    <main class="max-w-screen-xl mx-auto px-6 py-10">
      <RouterView @add-to-cart="addToCart" />
    </main>

    <!-- Drawer do carrinho -->
    <Teleport to="body">
      <Drawer
        v-model:visible="cartVisible"
        header="Carrinho"
        position="right"
        class="!w-full sm:!w-96"
        :pt="{ root: 'z-[100]', mask: 'z-[99]' }"
      >
        <CartSidebar
          :cart="cart"
          @remove-item="(p) => cart.removeItem(p)"
          @clear-cart="clearCart"
          @set-quantity="(p, q) => cart.setQuantity(p, q)"
          @checkout="goToCheckout"
        />
      </Drawer>
    </Teleport>

    <Toast position="bottom-right" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '../stores/auth.store'
import { Cart } from '../models/cart.model'
import type { Product } from '../models/product.model'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Drawer from 'primevue/drawer'
import Toast from 'primevue/toast'
import CartSidebar from '../components/CartSidebar.vue'

export default defineComponent({
  name: 'ConsumerLayout',
  components: { Button, Badge, Drawer, Toast, CartSidebar },

  setup() {
    const router = useRouter()
    const toast = useToast()
    const auth = useAuthStore() // ← única fonte da verdade

    const isDark = ref(false)
    const cartVisible = ref(false)
    const cart = ref(new Cart())

    const toggleDark = () => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    const addToCart = (product: Product) => {
      cart.value.addItem(product)
      toast.add({ severity: 'success', summary: 'Adicionado!', detail: product.name, life: 2000 })
    }

    const clearCart = () => {
      cart.value.clear()
      toast.add({ severity: 'info', summary: 'Carrinho limpo', detail: 'Todos os itens foram removidos', life: 2000 })
    }

    const goToCheckout = () => {
      cartVisible.value = false
      if (!auth.isAuthenticated) {
        toast.add({
          severity: 'warn',
          summary: 'Login necessário',
          detail: 'Faça login para finalizar sua compra',
          life: 3000,
        })
        router.push({ name: 'login', query: { redirect: '/checkout' } })
      } else {
        router.push({ name: 'checkout' })
      }
    }

    const handleLogout = () => {
      auth.logout() // limpa user, token e localStorage
      toast.add({ severity: 'info', summary: 'Até logo!', detail: 'Você saiu da sua conta.', life: 2000 })
      router.push('/login')
    }

    return {
      auth,
      isDark,
      toggleDark,
      cartVisible,
      cart,
      addToCart,
      clearCart,
      goToCheckout,
      handleLogout,
    }
  },
})
</script>