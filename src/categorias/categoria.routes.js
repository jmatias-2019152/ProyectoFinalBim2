import { actualizarCategoria, buscarCategoria, crearCategoria, eliminarCategoria, listarCategorias } from './categoria.controller.js'
import { Router } from 'express';
import { soloProgramador, validarJWT } from '../middlewares/validar-jwt.js'


const router = Router();

router.get(
    '/listar',
    [validarJWT],
    listarCategorias
)

router.post (
    '/buscar',
    [validarJWT],
    buscarCategoria
)

router.post(
    '/agregar',
    [validarJWT, soloProgramador],
    crearCategoria
)

router.put( 
    '/editar/:id',
    [validarJWT, soloProgramador],
    actualizarCategoria
) 

router.delete(
    '/delete/:id',
    [validarJWT, soloProgramador],
    eliminarCategoria
)


export default router