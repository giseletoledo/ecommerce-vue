import type { Request, Response } from 'express'
import type { CreateProductInput, ProductParams, ProductQuery } from '../schemas/product.schema'
import { randomUUID } from 'crypto'

// ─── Banco em memória ──────────────────────────────────────
interface Product {
  id: string
  name: string
  price: number
  categoryId: string
  createdAt: string
}

const products: Product[] = []

// ─── GET /products?category=uuid ──────────────────────────
export function listProducts(req: Request, res: Response): void {
  const { category } = req.query as unknown as ProductQuery

  const result = category
    ? products.filter((p) => p.categoryId === category)
    : products

  res.json({ data: result, total: result.length })
}

// ─── POST /products ────────────────────────────────────────
export function createProduct(req: Request, res: Response): void {
  const { name, price, categoryId } = req.body as CreateProductInput

  const newProduct: Product = {
    id: randomUUID(),
    name,
    price,
    categoryId,
    createdAt: new Date().toISOString(),
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
}

// ─── DELETE /products/:id ─────────────────────────────────
export function deleteProduct(req: Request, res: Response): void {
  const { id } = req.params as unknown as ProductParams

  const index = products.findIndex((p) => p.id === id)

  if (index === -1) {
    res.status(404).json({ status: 'error', message: 'Produto não encontrado.' })
    return
  }

  products.splice(index, 1)

  res.status(204).send()
}