import mongoose, { Schema } from 'mongoose';

const Eventos = new mongoose.Schema({
    tipoDeEvento: {
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
    },
    image:{
        type: String,
        required: true
    }
});

const Evento = mongoose.model('Eventos', Eventos);

export default Evento;