import { Router } from "express";
import { check } from "express-validator";
import { agregarEvento, eliminarEvento, mostrarTodosLosEventos} from "./eventos.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/agregar",
    [
        check('tipoDeEvento', 'El nombre del evento  es obligatorio').not().isEmpty(),
        check('fechaHoraInicio', 'La fecha de inicio del evento es obligatoria').not().isEmpty(),
        check('fechaHoraFin', 'La fecha de finalizacion  es obligatoria').not().isEmpty(),
        check('numeroAsistentes', 'El numero de asistentes es obligatorio').not().isEmpty(),
        check('serviciosAdicionales'),
        check('presupuesto', 'El presupuesto del servicio es obligatorio').not().isEmpty(),
        check('cliente', 'El nombre del cliente es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    agregarEvento
);

router.get(
    "/get",
    [], 
    mostrarTodosLosEventos
);

router.delete(
    "/delete",
    [
        check("id", "ID de hotel no válido").isMongoId()
    ], 
    eliminarEvento
);

export default router;
