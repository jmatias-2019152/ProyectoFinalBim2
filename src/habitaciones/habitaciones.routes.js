import { Router } from "express";
import { check } from "express-validator";
import { actualizarHabitacion, agregarHabitacion, buscarHabitacion, eliminarHabitacion, listarHabitacion } from "../habitaciones/habitaciones.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { soloProgramador, validarJWT } from '../middlewares/validar-jwt.js'
import { uploadImage } from '../middlewares/manejoImagenes.js'

const router = Router();

router.post(
    '/buscar',
    [
        validarJWT
    ],
    buscarHabitacion
);

router.get(
    "/get",
    [validarJWT], 
    listarHabitacion
);

router.post(
    "/agregar",
    [validarJWT, soloProgramador],uploadImage.single('image'),
    agregarHabitacion
);

router.put(
    "/editar/:id",
    [validarJWT, soloProgramador], uploadImage.single('image'),
    actualizarHabitacion
);

router.delete(
    "/delete/:id",
    [
        validarJWT, soloProgramador
    ], 
    eliminarHabitacion
);

export default router;
