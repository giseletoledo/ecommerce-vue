import type { Request, Response } from 'express'
import type { CreateCategoryInput, CategoryParams, CategoryQuery } from '../schemas/category.schema'
import { randomUUID } from 'crypto'

// ─── Banco em memória ──────────────────────────────────────
interface Category {
  id: string
  name: string
  createdAt: string
}

const categories: Category[] = []

// ─── GET /category?page=1&size=10 ─────────────────────────
// req.query já vem validado e transformado pelo middleware
export function listCategories(req: Request, res: Response): void {
  const { page, size } = req.query as unknown as CategoryQuery

  const start = (page - 1) * size
  const items = categories.slice(start, start + size)

  res.json({
    data: items,
    meta: { page, size, total: categories.length },
  })
}

// ─── GET /category/:id ────────────────────────────────────
export function getCategoryById(req: Request, res: Response): void {
  const { id } = req.params as unknown as CategoryParams

  const category = categories.find((c) => c.id === id)

  if (!category) {
    res.status(404).json({ status: 'error', message: 'Categoria não encontrada.' })
    return
  }

  res.json(category)
}

// ─── POST /category ────────────────────────────────────────
// req.body já vem validado pelo middleware — sem safeParse aqui
export function createCategory(req: Request, res: Response): void {
  const { name } = req.body as CreateCategoryInput

  const newCategory: Category = {
    id: randomUUID(),
    name,
    createdAt: new Date().toISOString(),
  }

  categories.push(newCategory)

  // 201 Created: convenção REST para recursos criados com sucesso
  res.status(201).json(newCategory)
}

// ─── PUT /category/:id ────────────────────────────────────
export function updateCategory(req: Request, res: Response): void {
  const { id } = req.params as unknown as CategoryParams
  const { name } = req.body as CreateCategoryInput

  const category = categories.find((c) => c.id === id)

  if (!category) {
    res.status(404).json({ status: 'error', message: 'Categoria não encontrada.' })
    return
  }

  category.name = name

  res.json(category)
}

// ─── DELETE /category/:id ─────────────────────────────────
export function deleteCategory(req: Request, res: Response): void {
  const { id } = req.params as unknown as CategoryParams

  const index = categories.findIndex((c) => c.id === id)

  if (index === -1) {
    res.status(404).json({ status: 'error', message: 'Categoria não encontrada.' })
    return
  }

  categories.splice(index, 1)

  // 204 No Content: sucesso sem corpo de resposta (convenção para DELETE)
  res.status(204).send()
}