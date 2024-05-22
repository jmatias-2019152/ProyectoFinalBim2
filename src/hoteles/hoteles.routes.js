import { Router } from "express";
import { check } from "express-validator";
import { actualizarHotel, agregarHotel, buscarHoteles, eliminarHotel, listarHoteles } from "./hoteles.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import {soloProgramador, validarJWT }from '../middlewares/validar-jwt.js'
import { uploadImage } from '../middlewares/manejoImagenes.js'
import { ReadPreference } from "mongodb";

const router = Router();

router.get(
    '/listar',
    [validarJWT],
    listarHoteles
)

router.post(
    '/buscar',
    [validarJWT],
    buscarHoteles
)

router.post(
    '/agregar',
    [validarJWT, soloProgramador], uploadImage.single('image'),
    agregarHotel
)

router.put(
    '/editar/:id',
    [validarJWT, soloProgramador], uploadImage.single('image'),
    actualizarHotel
)

router.get(
    '/delete/:id',
    [validarJWT, soloProgramador], 
    eliminarHotel
)

export default router;
