import { z } from 'zod'

// ─── POST /category ────────────────────────────────────────
// Valida o body da criação de categoria
// category.schema.ts — versão - Zod v4
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório.')
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.'),
})

// ─── GET | PUT | DELETE /category/:id ─────────────────────
// Garante que o :id da URL é um UUID válido
export const categoryParamsSchema = z.object({
  id: z.uuid('O ID informado não é um UUID válido.'),
})

// ─── GET /category?page=1&size=10 ─────────────────────────
// Converte strings da query para número e aplica defaults seguros
export const categoryQueryPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().int().positive('page deve ser um inteiro positivo.')),
  size: z
    .string()
    .optional()
    .default('10')
    .transform(Number)
    .pipe(z.number().int().min(1).max(100, 'size máximo é 100.')),
})

// ─── Tipos inferidos (TypeScript grátis) ──────────────────
export type CreateCategoryInput = z.infer<typeof createCategorySchema>
export type CategoryParams = z.infer<typeof categoryParamsSchema>
export type CategoryQuery = z.infer<typeof categoryQueryPaginationSchema>