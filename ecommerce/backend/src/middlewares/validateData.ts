import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'

// Qual parte da requisição queremos validar
type RequestPart = 'body' | 'params' | 'query'

// ─── validateData ──────────────────────────────────────────
// Recebe um schema Zod e a parte da req a validar.
// Se a validação falhar → retorna 400 com os erros mapeados.
// Se passar → substitui req[part] pelos dados já parseados e
// chama next() para seguir ao controller.
export function validateData(schema: ZodSchema, part: RequestPart = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[part])

    if (!result.success) {
      // Formata os erros do Zod em array legível
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))

      res.status(400).json({
        status: 'error',
        message: 'Dados inválidos.',
        errors,
      })
      return
    }

    // Substitui o dado bruto pelo dado já validado e tipado
    // (importante para os controllers não precisarem re-parsear)
    ;(req as any)[part] = result.data
    next()
  }
}