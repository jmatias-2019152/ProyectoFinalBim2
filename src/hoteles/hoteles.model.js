import mongoose, { Schema } from 'mongoose';

const HotelSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
},
user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
},
direccion:{
    type: String,
    required: true
},
email: {
    type: String,
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

export default mongoose.model('Hotel', HotelSchema);