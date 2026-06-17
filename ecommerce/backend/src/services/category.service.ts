import { randomUUID } from 'crypto'
import { Category } from '../entities/category.entity'
import type { ICategoryRepository } from '../repositories/category.repository'

export class CategoryService {
  // O service recebe o repository via construtor (injeção de dependência).
  // Isso facilita trocar InMemory por Postgres sem mudar o service.
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async getAll(page: number, size: number) {
    return this.categoryRepository.getAll(page, size)
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.getById(id)

    if (!category) {
      throw new Error('Categoria não encontrada.')
    }

    return category
  }

  async create(name: string): Promise<Category> {
    // Category.create() garante as regras de negócio antes de persistir.
    // Se o nome for inválido, o erro é lançado aqui — nunca chega ao repository.
    const category = Category.create(randomUUID(), name)
    return this.categoryRepository.create(category)
  }

  async update(id: string, name: string): Promise<Category> {
    // 1. Busca a categoria existente (lança erro se não encontrar)
    const category = await this.getById(id)

    // 2. Chama rename() na entity — regras de negócio aplicadas aqui
    category.rename(name)

    // 3. Passa a entity já atualizada para o repository persistir
    return this.categoryRepository.update(category)
  }

  async delete(id: string): Promise<void> {
    // Verifica se existe antes de deletar
    await this.getById(id)
    return this.categoryRepository.delete(id)
  }
}