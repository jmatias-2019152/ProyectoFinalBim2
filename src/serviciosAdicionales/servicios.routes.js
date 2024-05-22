import { Router } from "express";
import { check } from "express-validator";
import { agregarServicioAdicional, buscarServicios, listarServicio, editarServicio, eliminarServicio} from "./servicios.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {validarJWT, soloProgramador} from "../middlewares/validar-jwt.js"

const router = Router();

router.post(
    "/agregar",
    [
        check('tipoDeServicio', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion del servicio es obligatoria').not().isEmpty(),
        check('precio', 'El precio del servicio es obligatorio').not().isEmpty(),
        check('hotel', 'El hotel es obligatorio').not().isEmpty(),
        validarCampos, validarJWT, soloProgramador
    ], 
    agregarServicioAdicional
);

router.get(
    "/get",
    [], 
    listarServicio
);

router.post(
    "/buscar",
    [ validarJWT],
    buscarServicios
);

router.put(
    '/editar/:id',
    [validarJWT, soloProgramador],
    editarServicio
);

router.delete(
    '/delete/:id',
    [validarJWT, soloProgramador],
    eliminarServicio
)


export default router;
