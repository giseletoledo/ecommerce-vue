<template>
  <div :class="['min-h-screen', isDarkMode ? 'dark' : '']">
    <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">

      <!-- ConfirmDialog precisa estar montado na árvore para $confirm.require funcionar -->
      <ConfirmDialog />
      <Toast />

      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div class="container mx-auto px-4 py-3">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-blue-600 dark:text-blue-400">VueShop</h1>

            <div class="flex items-center gap-2">
              <!-- Botão do carrinho — componente PrimeVue -->
              <Button
                icon="pi pi-shopping-cart"
                :badge="cart.totalItems > 0 ? String(cart.totalItems) : undefined"
                badge-severity="danger"
                severity="secondary"
                text
                rounded
                aria-label="Abrir carrinho"
                @click="toggleCart"
              />

              <!-- Dark Mode — componente PrimeVue -->
              <Button
                :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
                severity="secondary"
                text
                rounded
                :aria-label="isDarkMode ? 'Modo claro' : 'Modo escuro'"
                @click="toggleDarkMode"
              />
            </div>
          </div>
        </div>
      </header>

      <!-- Main: grid de produtos 1 → 2 → 3 → 4 colunas -->
      <main class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </main>

      <!-- Overlay do carrinho -->
      <div
        v-if="cartVisible"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        @click="cartVisible = false"
      />

      <!-- Sidebar do carrinho -->
      <div :class="[
        'fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto',
        cartVisible ? 'translate-x-0' : 'translate-x-full'
      ]">
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold dark:text-white">Seu Carrinho</h2>
            <Button
              icon="pi pi-times"
              severity="secondary"
              text
              rounded
              aria-label="Fechar carrinho"
              @click="cartVisible = false"
            />
          </div>

          <Cart
            :cart="cart"
            @add-to-cart="addToCart"
            @remove-unit="removeUnit"
            @remove-item="removeItem"
            @clear-cart="confirmClearCart"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './components/ProductCard.vue'
import Cart from './components/Cart.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { useConfirm } from 'primevue/useconfirm'
import { Product } from './models/product.model'
import { Category } from './models/category.model'
import { Cart as CartModel } from './models/cart.model'

export default defineComponent({
  name: 'App',

  components: {
    ProductCard,
    Cart,
    ConfirmDialog,
    Toast,
  },

  setup() {
    const confirm = useConfirm()
    return { confirm }
  },

  data() {
    return {
      products: [] as Product[],
      cart: new CartModel(),
      cartVisible: false,
      isDarkMode: false,
    }
  },

  created() {
    this.loadProducts()
    this.isDarkMode = localStorage.getItem('darkMode') === 'true'
    this.applyDarkMode()
  },

  methods: {
    loadProducts() {
      const electronics = new Category(1, 'Eletrônicos')
      this.products = [
        new Product(1, 'Notebook', '/notebook.png', 3500, electronics, 0.1),
        new Product(2, 'Celular', '/phone.png', 2000, electronics),
      ]
    },

    addToCart(product: Product) {
      this.cart.addItem(product)
      this.cart = this.cart.clone()
      this.$toast.add({
        severity: 'success',
        summary: 'Adicionado!',
        detail: `${product.name} foi adicionado ao carrinho`,
        life: 2000,
      })
    },

    removeUnit(id: number) {
      this.cart.removeUnit(id)
      this.cart = this.cart.clone()
    },

    removeItem(id: number) {
      this.cart.removeItem(id)
      this.cart = this.cart.clone()
    },

    confirmClearCart() {
      this.confirm.require({
        message: 'Tem certeza que deseja remover todos os itens do carrinho?',
        header: 'Limpar carrinho',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Limpar tudo',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.cart.clear()
          this.cart = this.cart.clone()
          this.$toast.add({
            severity: 'info',
            summary: 'Carrinho limpo',
            detail: 'Todos os itens foram removidos',
            life: 2000,
          })
        },
      })
    },

    toggleCart() {
      this.cartVisible = !this.cartVisible
    },

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('darkMode', this.isDarkMode.toString())
      this.applyDarkMode()
    },

    applyDarkMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  },
})
</script>