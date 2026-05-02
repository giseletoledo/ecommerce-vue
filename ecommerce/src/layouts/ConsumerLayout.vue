<!-- src/layouts/ConsumerLayout.vue -->
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
          <!-- Dark mode toggle -->
          <Button :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'" rounded text severity="secondary" @click="toggleDark" />

          <!-- Admin button -->
          <RouterLink v-if="isAdmin" to="/admin">
            <Button label="Admin" icon="pi pi-cog" text severity="secondary" size="small" />
          </RouterLink>

          <!-- Auth button -->
          <Button
            :label="isLoggedIn ? 'Sair' : 'Entrar'"
            :icon="isLoggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in'"
            severity="secondary"
            text
            size="small"
            @click="handleAuth"
          />

          <!-- Cart button -->
          <div class="relative">
            <Button
              icon="pi pi-shopping-cart"
              rounded
              text
              severity="secondary"
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

    <!-- Main content via router -->
    <main class="max-w-screen-xl mx-auto px-6 py-10">
      <!-- Provide cart to child views via provide/inject -->
      <RouterView :cart="cart" @add-to-cart="addToCart" />
    </main>

    <!-- Cart Drawer -->
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
          @add-to-cart="addToCart"
          @remove-unit="removeUnit"
          @remove-item="removeItem"
          @clear-cart="clearCart"
          @set-quantity="setQuantity"
          @checkout="goToCheckout"
        />
      </Drawer>
    </Teleport>

    <Toast position="bottom-right" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Drawer from 'primevue/drawer'
import Toast from 'primevue/toast'
import CartSidebar from '../components/CartSidebar.vue'
import { Cart } from '../models/cart.model'
import type { Product } from '../models/product.model'

export default defineComponent({
  name: 'ConsumerLayout',

  components: { Button, Badge, Drawer, Toast, CartSidebar },

  setup() {
    const router = useRouter()
    const toast = useToast()

    const isLoggedIn = ref(false)
    const isAdmin = ref(false)
    const isDark = ref(false)
    const cartVisible = ref(false)
    const cart = ref(new Cart())

    const checkAuth = () => {
      const role = localStorage.getItem('user_role')
      isLoggedIn.value = role !== null
      isAdmin.value = role === 'ADMIN'
    }

    onMounted(() => {
      checkAuth()
      window.addEventListener('storage', checkAuth)
    })

    const handleAuth = () => {
      if (isLoggedIn.value) {
        localStorage.removeItem('user_role')
        isLoggedIn.value = false
        isAdmin.value = false
        router.push('/')
      } else {
        router.push('/login')
      }
    }

    const toggleDark = () => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    const addToCart = (product: Product) => {
      cart.value.addItem(product)
      toast.add({
        severity: 'success',
        summary: 'Adicionado!',
        detail: product.name,
        life: 2000,
      })
    }

    const removeUnit = (product: Product) => cart.value.removeUnit(product)
    const removeItem = (product: Product) => cart.value.removeItem(product)
    const setQuantity = (product: Product, qty: number) => cart.value.setQuantity(product, qty)

    const clearCart = () => {
      cart.value.clear()
      toast.add({
        severity: 'info',
        summary: 'Carrinho limpo',
        detail: 'Todos os itens foram removidos',
        life: 2000,
      })
    }

    const goToCheckout = () => {
      cartVisible.value = false
      if (!isLoggedIn.value) {
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

    return {
      isLoggedIn,
      isAdmin,
      isDark,
      cartVisible,
      cart,
      handleAuth,
      toggleDark,
      addToCart,
      removeUnit,
      removeItem,
      setQuantity,
      clearCart,
      goToCheckout,
    }
  },
})
</script>