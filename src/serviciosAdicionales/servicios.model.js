import mongoose, { Schema } from 'mongoose';

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
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
});

export default mongoose.model( "Servicio", ServiciosAdicionales);
