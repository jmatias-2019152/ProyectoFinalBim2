import Hotel from '../hoteles/hoteles.model.js'; // Importa el modelo de Hotel


// Agregar hotel
export const agregarHotel = async (req, res) => {
    try {
        const { nombreHotel, dirección, precio, descripción, serviciosAdicionales, evento } = req.body;

        const hotel = new Hotel({
            nombreHotel,
            dirección,
            precio,
            descripción,
            serviciosAdicionales,
            evento
        });

        await hotel.save();

        return res.status(200).json({
            msg: "¡Hotel agregado exitosamente a la base de datos!",
            hotel
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("No se pudo agregar el hotel a la base de datos");
    }
};

// Obtener un hotel
export const obtenerHoteles = async (req, res) => {
    try {
        const hoteles = await Hotel.find();

        if (!hoteles || hoteles.length === 0) {
            return res.status(404).json({ msg: "No se encontraron hoteles" });
        }

        return res.status(200).json({
            msg: "Lista de todos los hoteles",
            hoteles
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al obtener los hoteles");
    }
};



// Obtener un hotel por su ID
export const obtenerHotelPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).send("Hotel no encontrado");
        }
        return res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al obtener el hotel por su ID");
    }
};

// Actualizar información de un hotel
export const actualizarHotel = async (req, res) => {
    try {
        const { nombreHotel, dirección, precio, descripcion, serviciosAdicionales, evento } = req.body;
        const { id } = req.params;

        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({ msg: "Hotel no encontrado" });
        }

        if (nombreHotel) hotel.nombreHotel = nombreHotel;
        if (dirección) hotel.dirección = dirección;
        if (precio) hotel.precio = precio;
        if (descripcion) hotel.descripcion = descripcion;
        if (serviciosAdicionales) hotel.serviciosAdicionales = serviciosAdicionales;
        if (evento) hotel.evento = evento;

        await hotel.save();

        return res.status(200).json({
            msg: "Hotel actualizado correctamente",
            hotel
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al actualizar el hotel");
    }
};

// Eliminar un hotel
export const eliminarHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotelEliminado = await Hotel.findByIdAndDelete(id);
        if (!hotelEliminado) {
            return res.status(404).send("Hotel no encontrado");
        }
        return res.status(200).send("Hotel eliminado correctamente");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al eliminar el hotel");
    }
};