import Servicio from './servicios.model.js'


export const agregarServicioAdicional = async (req, res) => {
    try {
        const { tipoDeServicio, descripcion, precio } = req.body;

        const servicio = new Servicio({
            tipoDeServicio,
             descripcion,
             precio
        });

        await servicio.save();

        return res.status(200).json({
            msg: "Servicio agregado exitosamente a la base de datos!",
            servicio
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("No se pudo agregar el servicio a la base de datos");
    }
};

export const mostrarTodosLosServicios = async (req, res) => {
    try {
        const servicio = await Servicio.find();

        if (!servicio || servicio.length === 0) {
            return res.status(404).json({ msg: "No se encontraron servicios" });
        }

        return res.status(200).json({
            msg: "Lista de todas los servicios",
            servicio
        });
    } catch (error) {

        console.error(error);
        return res.status(500).send("Error al obtener los servicios");
    }
};