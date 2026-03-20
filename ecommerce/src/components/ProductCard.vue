<template>
  <Card class="h-full flex flex-col overflow-hidden hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-lg">
    <template #header>
      <img
        :src="product.img"
        :alt="product.name"
        class="w-full object-cover"
        style="aspect-ratio: 4/3"
      />
    </template>

    <template #content>
      <div class="flex flex-col gap-2">
        <Tag :value="product.category.toString()" severity="info" class="w-fit text-xs" />

        <h3 class="font-bold text-gray-800 dark:text-gray-100 text-base leading-snug">
          {{ product.name }}
        </h3>

        <div class="flex items-baseline gap-2 flex-wrap">
          <span
            v-if="product.discount"
            class="text-sm text-gray-400 dark:text-gray-500 line-through"
          >
            {{ formatCurrency(product.price) }}
          </span>

          <span class="text-xl font-extrabold text-gray-900 dark:text-white">
            {{ formatCurrency(product.priceWithDiscountApplied()) }}
          </span>

          <Badge
            v-if="product.discount"
            :value="`-${(product.discount * 100).toFixed(0)}%`"
            severity="success"
            class="text-xs"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <Button
        label="Adicionar ao carrinho"
        icon="pi pi-cart-plus"
        class="w-full"
        @click="$emit('add-to-cart', product)"
      />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Product } from '../models/product.model'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'

export default defineComponent({
  name: 'ProductCard',

  components: { Card, Button, Tag, Badge },

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: ['add-to-cart'],

  methods: {
    formatCurrency(value: number): string {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value)
    },
  },
})
</script>
