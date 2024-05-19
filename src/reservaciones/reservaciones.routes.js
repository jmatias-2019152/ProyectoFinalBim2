import { Router } from "express";
import { listarReservaciones, crearReservacion, actualizarReservacion, eliminarReservacion } from "../reservaciones/reservaciones.controller.js"

const router = Router()

router.get("/listarReservaciones", listarReservaciones)

router.post("/crearReservacion", crearReservacion)

router.put("/actualizarReservacion/:id", actualizarReservacion)

router.delete("/eliminarReservacion/:id",  eliminarReservacion)

export default router;