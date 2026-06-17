import { Category } from '../entities/category.entity'

// Interface que define o contrato do repository.
// O service depende desta interface, não da implementação concreta —
// isso facilita trocar o array em memória por SQL sem mudar o service.
export interface ICategoryRepository {
  create(category: Category): Promise<Category>
  getAll(page: number, size: number): Promise<{ data: Category[]; total: number }>
  getById(id: string): Promise<Category | null>
  update(category: Category): Promise<Category>
  delete(id: string): Promise<void>
}

// ─── Implementação em memória ──────────────────────────────
// Quando o banco estiver pronto, basta criar PgCategoryRepository
// implementando ICategoryRepository e trocar a injeção no server.ts.
export class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[] = []

  async create(category: Category): Promise<Category> {
    this.categories.push(category)
    return category
  }

  // page e size chegam já validados pelo controller via Zod.
  // LIMIT / OFFSET serão aplicados aqui quando migrar para SQL:
  //   SELECT * FROM categories ORDER BY created_at DESC LIMIT $1 OFFSET $2
  async getAll(page: number, size: number): Promise<{ data: Category[]; total: number }> {
    const total  = this.categories.length
    const offset = (page - 1) * size
    const data   = this.categories.slice(offset, offset + size)
    return { data, total }
  }

  async getById(id: string): Promise<Category | null> {
    return this.categories.find((c) => c.id === id) ?? null
  }

  // Recebe a entity já atualizada (o service chamou entity.rename antes).
  // Em SQL será: UPDATE categories SET name = $1 WHERE id = $2
  async update(category: Category): Promise<Category> {
    const index = this.categories.findIndex((c) => c.id === category.id)
    if (index !== -1) this.categories[index] = category
    return category
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter((c) => c.id !== id)
  }
}