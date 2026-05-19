import { Router, Request, Response } from 'express'

const router = Router()

// Dados mock — substituir por banco de dados futuramente
const products = [
  { id: 1, name: 'Notebook Gamer Pro',  category: 'eletronicos', price: 4599.90 },
  { id: 2, name: 'Fone Bluetooth TWS',  category: 'eletronicos', price: 249.90  },
  { id: 3, name: 'Smartwatch Fit',      category: 'eletronicos', price: 799.00  },
  { id: 4, name: 'Tênis Running X200',  category: 'esportes',    price: 359.90  },
  { id: 5, name: 'Camiseta Premium',    category: 'moda',        price: 89.90   },
  { id: 6, name: 'Mochila Urbana',      category: 'moda',        price: 179.90  },
  { id: 7, name: 'Vaso Decorativo',     category: 'casa',        price: 129.90  },
  { id: 8, name: 'Clean Code (Livro)',  category: 'livros',      price: 79.90   },
]

// ─── GET /products ──────────────────────────────────────────
// Query string opcional: ?category=eletronicos
// O Express NÃO declara query na URL — ela chega automaticamente em req.query
router.get('/', (req: Request, res: Response) => {
  const { category } = req.query

  if (category) {
    const filtered = products.filter(
      (p) => p.category === String(category).toLowerCase()
    )
    res.json(filtered)
    return
  }

  res.json(products)
})

// ─── GET /products/:id ──────────────────────────────────────
router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)

  // Regra: ID negativo → 400 Bad Request
  if (id < 0) {
    res.status(400).json({ error: 'ID inválido. O ID não pode ser negativo.' })
    return
  }

  const product = products.find((p) => p.id === id)

  if (!product) {
    res.status(404).json({ error: 'Produto não encontrado.' })
    return
  }

  res.json(product)
})

export default router