import { z } from 'zod'

// ─── POST /products ────────────────────────────────────────
// product.schema.ts — versão - Zod v4
export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório.')
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),

  price: z
    .number({ message: 'O preço é obrigatório.' })
    .positive('O preço deve ser um número positivo.'),

  categoryId: z
    .uuid('O categoryId deve ser um UUID válido.'),
})

// ─── GET | DELETE /products/:id ───────────────────────────
export const productParamsSchema = z.object({
  id: z.string().uuid('O ID informado não é um UUID válido.'),
})

// ─── GET /products?category=uuid ──────────────────────────
export const productQuerySchema = z.object({
  category: z
    .uuid('O filtro category deve ser um UUID válido.')
    .optional(),
})

// ─── Tipos inferidos ───────────────────────────────────────
export type CreateProductInput = z.infer<typeof createProductSchema>
export type ProductParams = z.infer<typeof productParamsSchema>
export type ProductQuery = z.infer<typeof productQuerySchema>