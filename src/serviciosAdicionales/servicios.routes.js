import { Router } from "express";
import { check } from "express-validator";
import { agregarServicioAdicional, buscarServicios, listarServicio, editarServicio, eliminarServicio} from "./servicios.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {validarJWT, soloProgramador} from "../middlewares/validar-jwt.js"

const router = Router();

router.post(
    "/createService",
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
    "/readService",
    [], 
    listarServicio
);

router.post(
    "/searchService",
    [ validarJWT],
    buscarServicios
);

router.put(
    '/updateService/:id',
    [validarJWT, soloProgramador],
    editarServicio
);

router.delete(
    '/deleteService/:id',
    [validarJWT, soloProgramador],
    eliminarServicio
)


export default router;
