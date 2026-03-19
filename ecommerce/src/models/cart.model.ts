import type { Product } from './product.model'

export interface CartItem {
  product: Product
  quantity: number
}

export class Cart {
  listproducts: CartItem[] = []

  addItem(product: Product): void {
    const existing = this.listproducts.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      this.listproducts.push({ product, quantity: 1 })
    }
  }

  removeUnit(product: Product): void {
  const index = this.listproducts.findIndex(item => item.product.id === product.id)
  
  // Early return se não encontrar o item
  if (index < 0) return

  const item = this.listproducts[index]
  
  // Type guard para garantir que item não é undefined
  if (item) {
    if (item.quantity > 1) {
      item.quantity--
    } else {
      this.listproducts.splice(index, 1)
    }
  }
}

  removeItem(product: Product): void {
    this.listproducts = this.listproducts.filter(item => item.product.id !== product.id)
  }

  clear(): void {
    this.listproducts = []
  }

  getTotalItems(): number {
    return this.listproducts.reduce((acc, item) => acc + item.quantity, 0)
  }

  getFinalPrice(): number {
    return this.listproducts.reduce(
      (acc, item) => acc + item.product.priceWithDiscountApplied() * item.quantity, 
      0
    )
  }
  setQuantity(product: Product, quantity: number): void {
  const item = this.listproducts.find(i => i.product.id === product.id)
  if (item) item.quantity = quantity
  }
}