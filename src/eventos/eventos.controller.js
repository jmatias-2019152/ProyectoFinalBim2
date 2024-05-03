import Evento from "../eventos/eventos.model.js";

export const agregarEvento = async (req, res) => {
    try {
        const { tipoDeEvento, fechaHoraInicio, fechaHoraFin, numeroAsistentes, serviciosAdicionales, presupuesto, cliente } = req.body;

        const evento = new Evento({
            tipoDeEvento,
            fechaHoraInicio,
            fechaHoraFin,
            numeroAsistentes,
            serviciosAdicionales,
            presupuesto,
            cliente
        });

        await evento.save();

        return res.status(200).json({
            msg: "Evento agregado exitosamente a la base de datos!",
            evento
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("No se pudo agregar el Evento a la base de datos");
    }
};



export const mostrarTodosLosEventos = async (req, res) => {
    try {
        const evento = await Evento.find();

        if (!evento || evento.length === 0) {
            return res.status(404).json({ msg: "No se encontraron eventos" });
        }

        return res.status(200).json({
            msg: "Lista de todos los eventos",
            evento
        });
    } catch (error) {

        console.error(error);
        return res.status(500).send("Error al obtener los servicios");
    }
};

export const eliminarEvento = async (req, res) => {
    try {
        const { id } = req.body;
        const eventoEliminado = await Evento.findByIdAndDelete(id);
        if (!eventoEliminado) {
            return res.status(404).send("Evento no encontrado");
        }
        return res.status(200).send("Evento eliminado correctamente");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al eliminar el evento");
    }
};