<template>
  <div class="product-card">
    <div class="product-badge">{{ product.category.title }}</div>

    <div class="product-icon">
      <span>{{ productEmoji }}</span>
    </div>

    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.formattedPrice }}</p>
    </div>

    <button class="btn-add" @click="$emit('add-to-cart', product)">
      <span class="btn-icon">+</span>
      Adicionar
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Product } from '../models/Product'

const emojiMap: Record<string, string> = {
  Eletrônicos: '💻',
  'Moda & Roupas': '👕',
  'Casa & Jardim': '🏡',
  'Esportes & Lazer': '⚽',
  Livros: '📚',
}

export default defineComponent({
  name: 'ProductCard',

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  emits: ['add-to-cart'],

  computed: {
    productEmoji(): string {
      return emojiMap[this.product.category.title] ?? '🛍️'
    },
  },
})
</script>

<style scoped>
.product-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-soft) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.product-card:hover::before {
  opacity: 1;
}

.product-badge {
  display: inline-flex;
  align-items: center;
  background: var(--badge-bg);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 100px;
  width: fit-content;
  position: relative;
  z-index: 1;
}

.product-icon {
  font-size: 48px;
  line-height: 1;
  position: relative;
  z-index: 1;
}

.product-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.product-name {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 6px;
  line-height: 1.3;
}

.product-price {
  font-size: 22px;
  font-weight: 800;
  color: var(--accent);
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  position: relative;
  z-index: 1;
  letter-spacing: 0.02em;
}

.btn-add:hover {
  background: var(--accent-dark);
}

.btn-add:active {
  transform: scale(0.97);
}

.btn-icon {
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
}
</style>
