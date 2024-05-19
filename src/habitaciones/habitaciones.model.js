import mongoose from 'mongoose';

const HabitacionSchema = new mongoose.Schema({
    tipoHabitacion: {
        type: String,
        required: [true, "El tipo de habitación es obligatorio"]
    },
    capacidad: {
        type: Number,
        required: [true, "La capacidad de la habitación es obligatoria"]
    },
    precio: {
        type: Number,
        required: [true, "El precio de la habitación es obligatorio"]
    },
    disponibilidad: {
        type: Boolean,
        default: true 
    },
    hotelAsociado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // Referencia al modelo de Hotel
        required: [true, "El hotel asociado es obligatorio"]
    }
});

export default mongoose.model('Habitacion', HabitacionSchema);
