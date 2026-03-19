<template>
  <Card class="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <template #header>
      <div class="flex justify-center p-4 bg-gray-50 dark:bg-gray-800">
        <img 
          :src="product.img" 
          :alt="product.name"
          class="w-32 h-32 object-contain"
          @error="handleImageError"
        />
      </div>
    </template>

    <template #title>
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
    </template>

    <template #subtitle>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ product.category.title }}
      </p>
    </template>

    <template #content>
      <div class="flex justify-between items-center mt-2">
        <p class="text-2xl font-bold text-primary">
          R$ {{ product.priceWithDiscountApplied().toFixed(2) }}
        </p>
        
        <span v-if="product.discount > 0" class="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
          -{{ product.discount * 100 }}%
        </span>
      </div>
    </template>

    <template #footer>
      <Button
        label="Adicionar"
        icon="pi pi-shopping-cart"
        class="w-full"
        severity="primary"
        @click="$emit('add-to-cart', product)"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { Product } from '../models/product.model'

export default defineComponent({
  name: 'ProductCard',

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: ['add-to-cart'],

  methods: {
    handleImageError(e: Event) {
      const img = e.target as HTMLImageElement
      img.src = 'https://placehold.co/200x200?text=Produto'
    }
  }
})
</script>