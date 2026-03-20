<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">

    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <span class="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight" style="font-family: var(--font-display)">
          VueShop
        </span>

        <div class="flex items-center gap-3">

          <Button :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'" rounded text severity="secondary" @click="toggleDark" />

          <!-- Cart button (mobile) -->
          <div class="relative">
  <Button 
    icon="pi pi-shopping-cart" 
    rounded 
    text 
    severity="secondary" 
    @click="cartVisible = true" 
  />
  <Badge 
    v-if="cart && cart.getTotalItems() > 0" 
    :value="cart.getTotalItems()" 
    severity="danger"
    class="absolute -top-1 -right-1 !text-xs pointer-events-none"
  />
</div>
        </div>
      </div>
    </header>

    <!-- Main layout -->
    <main class="max-w-screen-xl mx-auto px-6 py-10">
      <div class="flex gap-8 items-start">

        <!-- Products section -->
        <section class="flex-1 min-w-0">
          <div class="flex items-baseline gap-3 mb-8">
            <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight" style="font-family: var(--font-display)">
              Produtos
            </h1>
            <span class="text-sm text-gray-400 dark:text-gray-500 font-medium">
              {{ products ? products.length : 0 }} disponíveis
            </span>
          </div>

          <div v-if="products && products.length > 0" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            <ProductCard v-for="product in products" :key="product.id" :product="product" @add-to-cart="addToCart" />
          </div>
          <div v-else class="text-center py-12 text-gray-400">
            <i class="pi pi-spin pi-spinner text-4xl mb-4"></i>
            <p>Carregando produtos...</p>
          </div>
        </section>

      </div>
    </main>

    <!-- Mobile cart drawer -->
    <Teleport to="body">
      <Drawer v-model:visible="cartVisible" header="Carrinho" position="right" class="!w-full sm:!w-96" :pt="{
        root: 'z-[100]',
        mask: 'z-[99]'
      }">
        <CartSidebar v-if="cart" :cart="cart" @add-to-cart="addToCart" @remove-unit="removeUnit"
          @remove-item="removeItem" @clear-cart="clearCart" @set-quantity="setQuantity" />
      </Drawer>
    </Teleport>

    <!-- Toast -->
    <Toast position="bottom-right" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useToast } from 'primevue/usetoast'
import ProductCard from './components/ProductCard.vue'
import CartSidebar from './components/CartSidebar.vue'
import { Product } from './models/product.model'
import { Category } from './models/category.model'
import { Cart } from './models/cart.model'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Drawer from 'primevue/drawer'
import Toast from 'primevue/toast'

// ── Seed data ────────────────────────────────────────────
const electronics = new Category(1, 'Eletrônicos')
const fashion = new Category(2, 'Moda & Roupas')
const home = new Category(3, 'Casa & Jardim')
const sports = new Category(4, 'Esportes & Lazer')
const books = new Category(5, 'Livros')

const seedProducts: Product[] = [
  new Product(1, 'Notebook Gamer Pro', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', 4599.90, electronics, 0.10),
  new Product(2, 'Fone Bluetooth TWS', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 249.90, electronics),
  new Product(3, 'Smartwatch Fit', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', 799.00, electronics, 0.15),
  new Product(4, 'Tênis Running X200', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 359.90, sports),
  new Product(5, 'Camiseta Premium', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', 89.90, fashion, 0.05),
  new Product(6, 'Mochila Urbana', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', 179.90, fashion),
  new Product(7, 'Vaso Decorativo', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80', 129.90, home),
  new Product(8, 'Clean Code (Livro)', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80', 79.90, books, 0.20),
]

export default defineComponent({
  name: 'App',

  components: { ProductCard, CartSidebar, Button, Badge, Drawer, Toast },

  setup() {
    const toast = useToast()
    return { toast }
  },

  data() {
    return {
      products: [] as Product[],
      cart: null as Cart | null,
      cartVisible: false,
      isDark: false,
    }
  },

  created() {
    // Inicializar o carrinho
    this.cart = new Cart()

    // Carregar produtos (simulando async)
    setTimeout(() => {
      this.products = seedProducts
    }, 100)
  },

  methods: {
    addToCart(product: Product): void {
      if (!this.cart) return

      this.cart.addItem(product)
      this.toast.add({
        severity: 'success',
        summary: 'Adicionado!',
        detail: product.name,
        life: 2000,
      })
    },

    removeUnit(product: Product): void {
      if (!this.cart) return
      this.cart.removeUnit(product)
    },

    removeItem(product: Product): void {
      if (!this.cart) return
      this.cart.removeItem(product)
    },

    clearCart(): void {
      if (!this.cart) return
      this.cart.clear()
      this.toast.add({
        severity: 'info',
        summary: 'Carrinho limpo',
        detail: 'Todos os itens foram removidos',
        life: 2000,
      })
    },
    setQuantity(product: Product, quantity: number): void {
      if (!this.cart) return
      this.cart.setQuantity(product, quantity)
    },
    toggleDark(): void {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark', this.isDark)
    },
  },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  margin: 0;
  padding: 0;
}
</style>