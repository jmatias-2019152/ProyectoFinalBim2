import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
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