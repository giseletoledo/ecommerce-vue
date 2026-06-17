import { Router, Request, Response } from 'express'
import { validateData } from '../middlewares/validateData'
import { createProductSchema, productParamsSchema, productQuerySchema } from '../schemas/product.schema'
import { listProducts, createProduct, deleteProduct } from '../controllers/product.controller'

const router = Router()

// ─── GET /products ──────────────────────────────────────────
router.get('/', validateData(productQuerySchema, 'query'), listProducts)

// ─── GET /products/:id ──────────────────────────────────────
router.post('/', validateData(createProductSchema, 'body'), createProduct)

router.delete('/:id', validateData(productParamsSchema, 'params'), deleteProduct)

export default router