import mongoose from 'mongoose';

const Eventos = new mongoose.Schema({
    tipoDeEvento: {
        type: String,
        required: true
    },
    fechaHoraInicio: {
        type: Date,
        required: true
    },
    fechaHoraFin: {
        type: Date,
        required: true
    },
    numeroAsistentes: {
        type: Number,
        required: true
    },
    serviciosAdicionales: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicios'
    },
    presupuesto: {
        type: String,
        required: true
    },
    cliente: {
        type: String,
        required: true

    },
    estado: {
        type: String,
        default: "Pendiente"
    },
});

const Evento = mongoose.model('Eventos', Eventos);

export default Evento;