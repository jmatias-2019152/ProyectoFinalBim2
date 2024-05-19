import mongoose from "mongoose";

const ReservacionSchema = mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario es obligatorio"]
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TipoHabitacion",
        required: [true, "La habitación es obligatoria"]
    },
    fechaFin: {
        type: Date,
        required: [true, "La fecha de fin es obligatoria"]
    },
    estado: {
        type: String,
        enum: ["PENDIENTE", "CONFIRMADA", "CANCELADA"],
        default: "PENDIENTE"
    },
    total: {
        type: Number,
        required: [true, "El total es obligatorio"]
    }
},{
    timestamps:true 
});

export default mongoose.model("Reservacion", ReservacionSchema);