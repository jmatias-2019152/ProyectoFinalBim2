import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true,
    },
    dpi: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["PROGRAMADOR", "ADMINISTRADOR", "CLIENTE"],
        default: "CLIENTE"
    },
    img: {
        type: String,
    },
    state: {
        type: Boolean,
        default: true,
    }
})

UserSchema.methods.toJSON = function () {
    const { _v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema)