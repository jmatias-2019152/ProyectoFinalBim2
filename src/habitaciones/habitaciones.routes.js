import { Router } from "express";
import { check } from "express-validator";
import { crearHabitacion, mostrarTodasLasHabitaciones, obtenerHabitacionPorId, actualizarHabitacion, eliminarHabitacion } from "../habitaciones/habitaciones.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    '/agregar',
    [
        check('tipoHabitacion', 'El tipo de habitación es obligatorio').not().isEmpty(),
        check('capacidad', 'La capacidad de la habitación es obligatoria').not().isEmpty(),
        check('precio', 'El precio de la habitación es obligatorio').not().isEmpty(),
        check('disponibilidad', 'La disponibilidad de la habitación es obligatoria').not().isEmpty(),
        check('hotelAsociado', 'El hotel asociado es obligatorio').not().isEmpty(), 
        validarCampos
    ],
    crearHabitacion
);

router.get(
    "/get",
    [], 
    mostrarTodasLasHabitaciones
);

router.get(
    "/get/:id",
    [], 
    obtenerHabitacionPorId
);

router.put(
    "/put/:id",
    [
        check("id", "ID de hotel no válido").isMongoId(),
        check("id").custom(obtenerHabitacionPorId),
        
    ], 
    actualizarHabitacion
);

router.delete(
    "/del/:id",
    [
        check("id", "ID de hotel no válido").isMongoId(),
        check('creador', 'El creador es obligatorio').not().isEmpty(),
    ], 
    eliminarHabitacion
);

export default router;
