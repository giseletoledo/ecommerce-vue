import express from 'express'
import { loggerMiddleware } from './middlewares/logger'
import productsRouter from './routes/products.router'
import ordersRouter from './routes/orders.router'

const app = express()
const PORT = 3000

// ─── Middlewares globais ────────────────────────────────────
app.use(express.json())        // habilita leitura de req.body em JSON
app.use(loggerMiddleware)      // loga todas as requisições

// ─── Rotas ──────────────────────────────────────────────────
app.use('/products', productsRouter)
app.use('/orders', ordersRouter)

// ─── Rota raiz (healthcheck) ─────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ message: 'API VueShop rodando!', version: '1.0.0' })
})

// ─── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})