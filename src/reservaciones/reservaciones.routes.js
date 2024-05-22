import { Router } from "express";
import { addService, deleteReservation, getReservationRoom, getReservations, getReservedUser, saveReservation } from "../reservaciones/reservaciones.controller.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
const router = Router()

router.post(
    '/agregar',
    [validarJWT],
    saveReservation
)

router.delete(
    '/delete/:id',
    [validarJWT],
    deleteReservation
)

router.get(
    '/reservaciones',
    [validarJWT],
    getReservations
)

router.post(
    '/addServicio/:id',
    [validarJWT],
    addService
)

router.get(
    '/habitacionesReservacion',
    [validarJWT],
    getReservationRoom
)

router.get(
    '/userReservacion', [validarJWT], 
    getReservedUser
)
export default router;