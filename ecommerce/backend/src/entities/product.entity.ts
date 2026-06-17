export class Product {
  private constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number,
    public categoryId: string,
    public readonly createdAt: Date,
  ) {}

  // ─── Fábrica estática ──────────────────────────────────
  // Chamado pelo ProductService ao criar um novo produto.
  static create(
    id: string,
    name: string,
    price: number,
    stock: number,
    categoryId: string,
  ): Product {
    if (name.trim().length < 3) {
      throw new Error('O nome do produto deve ter no mínimo 3 caracteres.')
    }

    if (price <= 0) {
      throw new Error('O preço deve ser um valor positivo.')
    }

    if (stock < 0) {
      throw new Error('O estoque não pode ser negativo.')
    }

    if (!categoryId) {
      throw new Error('O categoryId é obrigatório.')
    }

    return new Product(id, name.trim(), price, stock, categoryId, new Date())
  }

  // ─── Reconstrói a partir do banco ─────────────────────
  static restore(
    id: string,
    name: string,
    price: number,
    stock: number,
    categoryId: string,
    createdAt: Date,
  ): Product {
    return new Product(id, name, price, stock, categoryId, createdAt)
  }

  // ─── Regras de negócio: atualizar campos ───────────────
  update(name: string, price: number, stock: number, categoryId: string): void {
    if (name.trim().length < 3) {
      throw new Error('O nome do produto deve ter no mínimo 3 caracteres.')
    }

    if (price <= 0) {
      throw new Error('O preço deve ser um valor positivo.')
    }

    if (stock < 0) {
      throw new Error('O estoque não pode ser negativo.')
    }

    this.name       = name.trim()
    this.price      = price
    this.stock      = stock
    this.categoryId = categoryId
  }
}