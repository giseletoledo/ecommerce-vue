<!-- src/views/ProductDetailView.vue -->
<template>
  <div v-if="product" class="max-w-5xl mx-auto">
    <Button icon="pi pi-arrow-left" label="Voltar" text @click="$router.back()" class="mb-6" />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card class="overflow-hidden">
        <img :src="product.img" :alt="product.name" class="w-full h-auto object-contain p-4" />
      </Card>
      
      <div>
        <Tag :value="product.category" severity="info" class="mb-4" />
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
        
        <div class="mb-6">
          <p class="text-3xl font-bold text-blue-600">
            R$ {{ product.priceWithDiscountApplied().toFixed(2) }}
          </p>
          <p v-if="product.discount > 0" class="text-sm text-green-600">
            {{ product.discount * 100 }}% OFF no PIX/Boleto
          </p>
        </div>
        
        <div class="border-t pt-6 mt-6">
          <Button 
            label="Adicionar ao Carrinho" 
            icon="pi pi-shopping-cart" 
            severity="primary" 
            size="large" 
            class="w-full"
            @click="addToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

// Dados mock
const allProducts = [
  { id: 1, name: 'Notebook Gamer Pro', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', price: 4599.90, discount: 0.1, category: 'Eletrônicos', priceWithDiscountApplied: function() { return this.price * (1 - this.discount) } },
  { id: 2, name: 'Fone Bluetooth TWS', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', price: 249.90, discount: 0, category: 'Acessórios', priceWithDiscountApplied: function() { return this.price } },
  { id: 3, name: 'Smartwatch Fit', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', price: 799.00, discount: 0.15, category: 'Eletrônicos', priceWithDiscountApplied: function() { return this.price * (1 - this.discount) } },
]

export default defineComponent({
  name: 'ProductDetailView',
  components: { Card, Button, Tag },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const product = ref<any>(null)
    
    onMounted(() => {
      const id = Number(route.params.id)
      const found = allProducts.find(p => p.id === id)
      if (found) {
        product.value = found
      } else {
        router.push('/')
      }
    })
    
    const addToCart = () => {
      alert(`✅ ${product.value?.name} adicionado ao carrinho!`)
    }
    
    return { product, addToCart }
  }
})
</script>