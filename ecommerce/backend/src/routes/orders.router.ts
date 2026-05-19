import { Router, Request, Response } from 'express'

const router = Router()

// Tipo que define a estrutura de um pedido
interface Order {
  id: number
  customerName: string
  productIds: number[]
  status: string
}

// "Banco" em memória — reinicia com o servidor
const orders: Order[] = []
let nextId = 1

// ─── POST /orders ───────────────────────────────────────────
// Body esperado: { customerName: string, productIds: number[] }
router.post('/', (req: Request, res: Response) => {
  // Middleware de validação inline: body vazio → 400
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ error: 'O corpo da requisição não pode estar vazio.' })
    return
  }

  const { customerName, productIds } = req.body

  if (!customerName || !productIds) {
    res.status(400).json({ error: 'Campos obrigatórios: customerName, productIds.' })
    return
  }

  const newOrder: Order = {
    id: nextId++,
    customerName,
    productIds,
    status: 'pendente',
  }

  orders.push(newOrder)

  // 201 Created → convenção REST para recursos criados com sucesso
  res.status(201).json(newOrder)
})

// ─── PATCH /orders/:id ──────────────────────────────────────
// Body esperado: { status: string }
router.patch('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { status } = req.body

  const order = orders.find((o) => o.id === id)

  if (!order) {
    res.status(404).json({ error: 'Pedido não encontrado.' })
    return
  }

  if (!status) {
    res.status(400).json({ error: 'Campo obrigatório: status.' })
    return
  }

  order.status = status // atualiza só o campo enviado (é isso que PATCH significa)

  res.json(order)
})

// ─── DELETE /orders/:id ─────────────────────────────────────
router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const index = orders.findIndex((o) => o.id === id)

  if (index === -1) {
    res.status(404).json({ error: 'Pedido não encontrado.' })
    return
  }

  orders.splice(index, 1)

  // 204 No Content → sucesso sem corpo de resposta (convenção para DELETE)
  res.status(204).send()
})

export default router