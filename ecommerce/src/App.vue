<template>
  <div class="app">
    <header class="app-header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">VueShop</span>
        </div>
        <div class="header-meta">
          <span class="header-tag">Options API · TypeScript</span>
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="page-layout">
        <!-- Produtos -->
        <section class="products-section">
          <div class="section-header">
            <h1 class="section-title">Produtos</h1>
            <span class="section-sub">{{ products.length }} itens disponíveis</span>
          </div>

          <div class="products-grid">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>
        </section>

        <!-- Carrinho -->
        <CartSummary
          :cart="cart"
          @add-to-cart="addToCart"
          @remove-unit="removeUnit"
          @remove-item="removeItem"
          @clear-cart="clearCart"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './components/ProductCard.vue'
import CartSummary from './components/Cart.vue'
import { Product } from './models/Product'
import { Category } from './models/Category'
import { Cart } from './models/Cart'

// Dados fictícios
const electronics = new Category(1, 'Eletrônicos')
const fashion = new Category(2, 'Moda & Roupas')
const home = new Category(3, 'Casa & Jardim')
const sports = new Category(4, 'Esportes & Lazer')
const books = new Category(5, 'Livros')

const seedProducts: Product[] = [
  new Product(1, 'Notebook Gamer Pro', 4599.9, electronics),
  new Product(2, 'Fone Bluetooth TWS', 249.9, electronics),
  new Product(3, 'Smartwatch Fit', 799.0, electronics),
  new Product(4, 'Tênis Running X200', 359.9, sports),
  new Product(5, 'Camiseta Premium', 89.9, fashion),
  new Product(6, 'Mochila Urbana', 179.9, fashion),
  new Product(7, 'Vaso Decorativo', 129.9, home),
  new Product(8, 'Clean Code (Livro)', 79.9, books),
]

export default defineComponent({
  name: 'App',

  components: {
    ProductCard,
    CartSummary,
  },

  data() {
    return {
      products: seedProducts as Product[],
      cart: new Cart(),
    }
  },

  methods: {
    addToCart(product: Product): void {
      this.cart.addItem(product)
      // Force Vue reactivity on the Cart instance
      this.cart = Object.assign(Object.create(Object.getPrototypeOf(this.cart)), this.cart)
    },

    removeUnit(productId: number): void {
      this.cart.removeUnit(productId)
      this.cart = Object.assign(Object.create(Object.getPrototypeOf(this.cart)), this.cart)
    },

    removeItem(productId: number): void {
      this.cart.removeItem(productId)
      this.cart = Object.assign(Object.create(Object.getPrototypeOf(this.cart)), this.cart)
    },

    clearCart(): void {
      this.cart.clear()
      this.cart = Object.assign(Object.create(Object.getPrototypeOf(this.cart)), this.cart)
    },
  },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  --bg: #f8f7f4;
  --card-bg: #ffffff;
  --border: #e8e5e0;
  --accent: #2563eb;
  --accent-dark: #1d4ed8;
  --accent-soft: rgba(37, 99, 235, 0.05);
  --badge-bg: rgba(37, 99, 235, 0.1);
  --text-primary: #1a1a1a;
  --text-muted: #6b7280;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

.app-header {
  background: #fff;
  border-bottom: 1px solid var(--border);
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 22px;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.header-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--bg);
  padding: 4px 10px;
  border-radius: 100px;
  border: 1px solid var(--border);
}

.app-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 32px;
}

.page-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

.section-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 28px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.section-sub {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

@media (max-width: 900px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .app-main {
    padding: 24px 16px;
  }
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
