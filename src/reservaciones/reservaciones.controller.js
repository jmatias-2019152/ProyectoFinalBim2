import Reservacion from '../reservaciones/reservaciones.model.js';

export const listarReservaciones = async (req, res) => {
    const reservaciones = await Reservacion.find({ estado: true });
    res.status(200).json({
        reservaciones
    });
}

export const crearReservacion = async (req, res) => {
    const { usuario, habitacion,  fechaFin, total } = req.body;
    const reservacion = new Reservacion({ usuario, habitacion, fechaFin, total });

    await reservacion.save();
    res.status(200).json({
        msg: "Reservación creada exitosamente"
    });
}

export const actualizarReservacion = async (req, res) => {
    const { id, ...rest } = req.body;
    await Reservacion.findByIdAndUpdate(id, rest);
    res.status(200).json({
        msg: "Reservación actualizada exitosamente"
    });
}

export const eliminarReservacion = async (req, res) => {
    const { id } = req.body
    await Reservacion.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({
        msg: "Reservación eliminada exitosamente"
    });
}

export const obtenerReservacion = async (req, res) => {
    const { id } = req.body;
    const reservacion = await Reservacion
        .findById(id)
        .populate('usuario')
        .populate('habitacion');
    res.status(200).json({
        reservacion
    });
}