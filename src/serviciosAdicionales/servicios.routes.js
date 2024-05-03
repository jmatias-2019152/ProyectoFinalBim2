import { Router } from "express";
import { check } from "express-validator";
import { agregarServicioAdicional, mostrarTodosLosServicios} from "./servicios.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/agregar",
    [
        check('tipoDeServicio', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion del servicio es obligatoria').not().isEmpty(),
        check('precio', 'El precio del servicio es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    agregarServicioAdicional
);

router.get(
    "/get",
    [], 
    mostrarTodosLosServicios
);

export default router;
