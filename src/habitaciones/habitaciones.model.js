import mongoose, { Schema } from 'mongoose';

const HabitacionSchema = new mongoose.Schema({
    tipoDeHabitacion:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'hotel',
        required: true
    },
    contador: {
        type: Number,
        required: true,
        default: 0
    },
    image:{
        type: String,
        required: true

    }
});

export default mongoose.model('Habitacion', HabitacionSchema);
