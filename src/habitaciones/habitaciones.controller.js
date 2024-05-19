import Habitacion from '../habitaciones/habitaciones.model.js'; // Importa el modelo de Habitacion
import Hotel from '../hoteles/hoteles.model.js'
import { validationResult } from 'express-validator';

export const crearHabitacion = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { tipoHabitacion, capacidad, precio, disponibilidad, hotelAsociado } = req.body;

        const hotelExistente = await Hotel.findById(hotelAsociado);
        if (!hotelExistente) {
            return res.status(404).json({ msg: 'El hotel asociado no existe' });
        }

        const habitacion = new Habitacion({
            tipoHabitacion,
            capacidad,
            precio,
            disponibilidad,
            hotelAsociado
        });

        await habitacion.save();

        return res.status(200).json({
            msg: "¡Habitación agregada exitosamente a la base de datos!",
            habitacion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al agregar la habitación a la base de datos");
    }
};

export const mostrarTodasLasHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.find();

        if (!habitaciones || habitaciones.length === 0) {
            return res.status(404).json({ msg: "No se encontraron habitaciones" });
        }

        return res.status(200).json({
            msg: "Lista de todas las habitaciones",
            habitaciones
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al obtener las habitaciones");
    }
};


export const obtenerHabitacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitacion.findById(id);
        if (!habitacion) {
            return res.status(404).send("Habitación no encontrada");
        }
        return res.status(200).json(habitacion);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al obtener la habitación por su ID");
    }
};

// Actualizar información de una habitación
export const actualizarHabitacion = async (req, res) => {
    try {
        const { tipoHabitacion, capacidad, precio, disponibilidad, hotelAsociado } = req.body;
        const { id } = req.params;

        const habitacion = await Habitacion.findById(id);

        if (!habitacion) {
            return res.status(404).json({ msg: "Habitación no encontrada" });
        }

        if (tipoHabitacion) habitacion.tipoHabitacion = tipoHabitacion;
        if (capacidad) habitacion.capacidad = capacidad;
        if (precio) habitacion.precio = precio;
        if (disponibilidad !== undefined) habitacion.disponibilidad = disponibilidad;
        if (hotelAsociado) habitacion.hotelAsociado = hotelAsociado;

        await habitacion.save();

        return res.status(200).json({
            msg: "Habitación actualizada correctamente",
            habitacion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al actualizar la habitación");
    }
};


export const eliminarHabitacion = async (req, res) => {
    try {
        const { id } = req.params;
        const habitacionEliminada = await Habitacion.findByIdAndDelete(id);
        if (!habitacionEliminada) {
            return res.status(404).send("Habitación no encontrada");
        }
        return res.status(200).send("Habitación eliminada correctamente");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al eliminar la habitación");
    }
};
