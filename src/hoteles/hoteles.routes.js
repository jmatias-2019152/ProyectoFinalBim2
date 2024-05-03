import { Router } from "express";
import { check } from "express-validator";
import { agregarHotel, obtenerHoteles, obtenerHotelPorId, actualizarHotel, eliminarHotel } from "./hoteles.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/agregar",
    [
        check('nombreHotel', 'El nombre del hotel es obligatorio').not().isEmpty(),
        check('dirección', 'La dirección del hotel es obligatoria').not().isEmpty(),
        check('precio', 'El precio del hotel es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción del hotel es obligatoria').not().isEmpty(), 
        check('serviciosAdicionales', 'Los servicios del hotel son obligatorios'), //Poner .not().isEmpty(), cuando esten completos los modelos
        check('evento', 'Los eventos del hotel son obligatorios'), //Poner .not().isEmpty(), cuando esten completos los modelos
        validarCampos,
    ], 
    agregarHotel
);

router.get(
    "/get",
    [], 
    obtenerHoteles
);

router.get(
    "/get/:id",
    [], 
    obtenerHotelPorId
);

router.put(
    "/put/:id",
    [
        check("id", "ID de hotel no válido").isMongoId(),
        check("id").custom(obtenerHotelPorId),
        
    ], 
    actualizarHotel
);

router.delete(
    "/del/:id",
    [
        check("id", "ID de hotel no válido").isMongoId(),
        check('creador', 'El creador es obligatorio').not().isEmpty(),
    ], 
    eliminarHotel
);

export default router;
