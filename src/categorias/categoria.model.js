import mongoose, { Schema } from "mongoose";

const CategoriaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})


export default mongoose.model('Categoria', CategoriaSchema)