<template>
  <div :class="['min-h-screen', isDarkMode ? 'dark' : '']">
    <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-blue-600 dark:text-blue-400">VueShop</h1>
            
            <div class="flex items-center gap-4">
              <!-- Botão do carrinho com badge -->
              <button 
                class="relative p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                @click="toggleCart"
              >
                <i class="pi pi-shopping-cart text-xl"></i>
                <span v-if="cart.totalItems > 0" 
                  class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ cart.totalItems }}
                </span>
              </button>
              
              <!-- Botão Dark Mode -->
              <button 
                @click="toggleDarkMode"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <i :class="['pi', isDarkMode ? 'pi-moon' : 'pi-sun']"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <!-- Grid de Produtos - Tailwind CSS -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </main>

      <!-- Carrinho Sidebar -->
      <div v-if="cartVisible" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        @click="cartVisible = false"
      ></div>
      
      <div :class="[
        'fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300',
        cartVisible ? 'translate-x-0' : 'translate-x-full'
      ]">
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Seu Carrinho</h2>
            <button @click="cartVisible = false" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <i class="pi pi-times"></i>
            </button>
          </div>
          
          <Cart
            :cart="cart"
            @add-to-cart="addToCart"
            @remove-unit="removeUnit"
            @remove-item="removeItem"
            @clear-cart="clearCart"
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
import { Product } from './models/product.model'
import { Category } from './models/category.model'
import { Cart as CartModel } from './models/cart.model'

export default defineComponent({
  name: 'App',
  components: {
    ProductCard,
    Cart
  },

  data() {
    return {
      products: [] as Product[],
      cart: new CartModel(),
      cartVisible: false,
      isDarkMode: false
    }
  },

  created() {
    this.loadProducts()
    // Verificar preferência de dark mode
    this.isDarkMode = localStorage.getItem('darkMode') === 'true'
    this.applyDarkMode()
  },

  methods: {
    loadProducts() {
      const electronics = new Category(1, 'Eletrônicos')
      
      // APENAS 2 PRODUTOS com as imagens que você tem
      this.products = [
        new Product(1, 'Notebook', '/notebook.png', 3500, electronics),
        new Product(2, 'Celular', '/phone.png', 2000, electronics),
      ]
    },

    addToCart(product: Product) {
      this.cart.addItem(product)
      this.cart = { ...this.cart } // Força reatividade
    },

    removeUnit(id: number) {
      this.cart.removeUnit(id)
      this.cart = { ...this.cart }
    },

    removeItem(id: number) {
      this.cart.removeItem(id)
      this.cart = { ...this.cart }
    },

    clearCart() {
      if (confirm('Deseja realmente limpar o carrinho?')) {
        this.cart.clear()
        this.cart = { ...this.cart }
      }
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
    }
  }
})
</script>