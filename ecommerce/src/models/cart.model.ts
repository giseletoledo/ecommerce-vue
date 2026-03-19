import type { Product } from './product.model'

export interface CartItem {
  product: Product
  quantity: number
}

export class Cart {
  cartItems: CartItem[] = []

  get totalItems(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.priceWithDiscountApplied() * item.quantity,
      0
    )
  }

  get formattedTotalPrice(): string {
    return this.totalPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  addItem(product: Product): void {
    const existing = this.cartItems.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      this.cartItems.push({ product, quantity: 1 })
    }
  }

  removeUnit(productId: number): void {
    const item = this.cartItems.find((i) => i.product.id === productId)
    if (!item) return
    if (item.quantity > 1) {
      item.quantity--
    } else {
      this.removeItem(productId)
    }
  }

  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter((i) => i.product.id !== productId)
  }

  clear(): void {
    this.cartItems = []
  }
}