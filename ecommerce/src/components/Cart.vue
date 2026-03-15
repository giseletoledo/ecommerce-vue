<template>
  <aside class="cart-panel" :class="{ 'cart-panel--empty': cart.totalItems === 0 }">
    <div class="cart-header">
      <h2 class="cart-title">Carrinho</h2>
      <span class="cart-count" v-if="cart.totalItems > 0">
        {{ cart.totalItems }} {{ cart.totalItems === 1 ? 'item' : 'itens' }}
      </span>
    </div>

    <div class="cart-empty" v-if="cart.totalItems === 0">
      <span class="cart-empty-icon">🛒</span>
      <p>Seu carrinho está vazio</p>
    </div>

    <ul class="cart-list" v-else>
      <li
        v-for="item in cart.cartItems"
        :key="item.product.id"
        class="cart-item"
      >
        <div class="cart-item-info">
          <span class="cart-item-name">{{ item.product.name }}</span>
          <span class="cart-item-unit-price">{{ item.product.formattedPrice }} / un</span>
        </div>

        <div class="cart-item-controls">
          <button class="ctrl-btn" @click="$emit('remove-unit', item.product.id)" title="Remover 1">−</button>
          <span class="cart-item-qty">{{ item.quantity }}</span>
          <button class="ctrl-btn" @click="$emit('add-to-cart', item.product)" title="Adicionar 1">+</button>
          <button class="ctrl-btn ctrl-btn--delete" @click="$emit('remove-item', item.product.id)" title="Excluir">
            🗑
          </button>
        </div>

        <div class="cart-item-subtotal">
          {{ formatCurrency(item.product.price * item.quantity) }}
        </div>
      </li>
    </ul>

    <div class="cart-footer" v-if="cart.totalItems > 0">
      <div class="cart-total-row">
        <span>Total</span>
        <strong class="cart-total-price">{{ cart.formattedTotalPrice }}</strong>
      </div>
      <button class="btn-checkout" @click="$emit('clear-cart')">
        Limpar carrinho
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type {  PropType } from 'vue'
import { Cart } from '../models/Cart'

export default defineComponent({
  name: 'Cart',

  props: {
    cart: {
      type: Object as PropType<Cart>,
      required: true,
    },
  },

  emits: ['add-to-cart', 'remove-unit', 'remove-item', 'clear-cart'],

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

<style scoped>
.cart-panel {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: fit-content;
  position: sticky;
  top: 24px;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.cart-count {
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 100px;
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 32px 0;
  color: var(--text-muted);
  font-size: 14px;
}

.cart-empty-icon {
  font-size: 40px;
  opacity: 0.4;
}

.cart-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cart-item-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.cart-item-unit-price {
  font-size: 12px;
  color: var(--text-muted);
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ctrl-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-primary);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.ctrl-btn:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.ctrl-btn--delete {
  margin-left: auto;
  font-size: 13px;
}

.ctrl-btn--delete:hover {
  background: #ef4444;
  border-color: #ef4444;
}

.cart-item-qty {
  min-width: 24px;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
}

.cart-item-subtotal {
  font-weight: 800;
  font-size: 15px;
  color: var(--accent);
  text-align: right;
}

.cart-footer {
  border-top: 2px solid var(--border);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: var(--text-primary);
}

.cart-total-price {
  font-size: 24px;
  color: var(--accent);
  font-family: var(--font-display);
}

.btn-checkout {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 11px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-checkout:hover {
  background: #fee2e2;
  color: #ef4444;
  border-color: #fca5a5;
}
</style>
