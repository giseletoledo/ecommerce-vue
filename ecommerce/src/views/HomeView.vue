<template>
  <div class="p-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Produtos</h1>

      <RouterLink to="/cart">
        <Button icon="pi pi-shopping-cart" label="Carrinho" />
      </RouterLink>
    </div>

    <!-- GRID DE PRODUTOS -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// componentes
import ProductCard from '../components/ProductCard.vue'

// PrimeVue
import Button from 'primevue/button'

// model
import { Product } from '../models/product.model'
import type { Category } from '../models/category.model'

export default defineComponent({
  name: 'HomeView',

  components: {
    ProductCard,
    Button,
  },

  data() {
    return {
      products: [] as Product[],
    }
  },

  created() {
    this.loadProducts()
  },

  methods: {
    loadProducts() {
      // mock simples (depois você pode trocar por API)
      const category: Category = { id: 1, title: 'Eletrônicos' }

      this.products = [
        new Product(1, 'Notebook', '/images/notebook.png', 3500, category, 0.1),
        new Product(2, 'Smartphone', '/images/phone.png', 2000, category),
        new Product(3, 'Fone Bluetooth', '/images/headphone.png', 300, category),
        new Product(4, 'Monitor', '/images/monitor.png', 1200, category),
      ]
    },

    addToCart(product: Product) {
      console.log('Adicionar ao carrinho:', product)

      // próximo passo: integrar com Pinia
    },
  },
})
</script>