import express from 'express'
import {generateInvoice,invoiceRechazed, getInvoiceUser, getAllInvoices} from './factura.controller.js'

 import { validarJWT } from '../middlewares/validar-jwt.js'


const router = express.Router();



router.post('/generateInvoice/:id', [validarJWT], generateInvoice)
router.put('/invoiceRechazed/:id', [validarJWT], invoiceRechazed)
router.get('/getInvoiceUser', [validarJWT], getInvoiceUser)
router.get('/getAllInvoices', [validarJWT], getAllInvoices)

export default router