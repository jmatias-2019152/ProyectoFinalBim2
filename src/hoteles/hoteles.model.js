import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema ({
    nombreHotel:{
        type: String,
        required: [true, "El nombre del hotel es obligatorio"]
    },
    dirección:{
        type:String,
        required: [true, "La direccion de la caregoria es obligatoria"]
    },
    precio: {
        type: String,
        require: [true, 'El precio del producto es obligatorio'],
    },
    descripción: {
        type: String,
        require: [true, 'la descripcion del hotel es obligatoria'],
    },
    serviciosAdicionales: [
        {
          type: mongoose.Schema.Types.ObjectId,
          /*required: [true, 'Servicios adicionales obligatorios'],*/
          ref: 'ServiciosAdicionales',
        },
      ],
    evento: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'evento',
        },
      ],


});

export default mongoose.model('Hotel', HotelSchema);