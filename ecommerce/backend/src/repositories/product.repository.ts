import { Product } from '../entities/product.entity'

export interface IProductRepository {
  create(product: Product): Promise<Product>
  getAll(page: number, size: number): Promise<{ data: Product[]; total: number }>
  getById(id: string): Promise<Product | null>
  update(product: Product): Promise<Product>
  delete(id: string): Promise<void>
}

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = []

  async create(product: Product): Promise<Product> {
    this.products.push(product)
    return product
  }

  // Em SQL será:
  //   SELECT p.*, p.category_id FROM products p
  //   ORDER BY created_at DESC LIMIT $1 OFFSET $2
  async getAll(page: number, size: number): Promise<{ data: Product[]; total: number }> {
    const total  = this.products.length
    const offset = (page - 1) * size
    const data   = this.products.slice(offset, offset + size)
    return { data, total }
  }

  async getById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) ?? null
  }

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === product.id)
    if (index !== -1) this.products[index] = product
    return product
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id)
  }
}