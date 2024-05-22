import { Router } from "express";
import { check } from "express-validator";
import { actualizarEvento, agregarEvento, eliminarEvento, imagen, listarEventos} from "./eventos.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { uploadImage } from "../middlewares/manejoImagenes.js";
import { soloProgramador, validarJWT } from '../middlewares/validar-jwt.js'


const router = Router();

router.get(
    '/listar',
    [validarJWT],
    listarEventos
)

router.post(
    "/agregar",
    [
        validarJWT, soloProgramador
    ], uploadImage.single('image'),
    agregarEvento
);

router.put( 
    '/editar/:id',
    [validarJWT, soloProgramador], uploadImage.single('image')
    , actualizarEvento
)

router.delete(
    '/delete/:id',
    [validarJWT, soloProgramador],
    eliminarEvento
)

router.get(
    '/imagen/:id',
    imagen
)
export default router;
