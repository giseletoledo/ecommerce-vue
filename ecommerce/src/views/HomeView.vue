<template>
  <div>
    <!-- Header section -->
    <div class="flex items-baseline gap-3 mb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight" style="font-family: var(--font-display)">
        Produtos
      </h1>
      <span class="text-sm text-gray-400 dark:text-gray-500 font-medium">
        {{ products.length }} disponíveis
      </span>
    </div>

    <!-- Products grid -->
    <div v-if="products.length > 0" class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>

    <div v-else class="text-center py-12 text-gray-400">
      <i class="pi pi-spin pi-spinner text-4xl mb-4"></i>
      <p>Carregando produtos...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { Product } from '../models/product.model'
import { Category } from '../models/category.model'

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
  name: 'HomeView',
  components: { ProductCard },
  emits: ['add-to-cart'],

  data() {
    return {
      products: [] as Product[],
    }
  },

  created() {
    setTimeout(() => {
      this.products = seedProducts
    }, 100)
  },
})
</script>