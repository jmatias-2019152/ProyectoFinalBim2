import mongoose from 'mongoose';

const ServiciosAdicionales = new mongoose.Schema({
    tipoDeServicio: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    }
});

const Evento = mongoose.model( "Servicios", ServiciosAdicionales);

export default Evento;