import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js';

export const registerProgramador = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'PROGRAMADOR'
        let user = new User(data)
        await user.save()
        return res.send({ message: `Registered admin successfully, can be logged with username ${user.username}` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error registering user', error: error })
    }
}

export const registerAdmin = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMINISTRADOR'
        let user = new User(data)
        await user.save()
        return res.send({ message: `Registered admin successfully, can be logged with username ${user.username}` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error registering user', error: error })
    }
}

export const register = async (req, res) => {
    try {
        const { name, email, username, password, role } = req.body;

        const user = new User({ name, email, username, password, role });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            msg: "The user was added successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(409).json({
            error: error.message,
            msg: "Contact the administrator",
        });
    }
};

export const listar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const userL = {
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        };
        return res.send({ userL });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error getting user details' });
    }
};


export const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    // Actualiza el usuario en la base de datos
    await User.findByIdAndUpdate(id, rest);

    // Obtiene el usuario actualizado
    const user = await User.findOne({ _id: id });

    res.status(200).json({
        msg: 'User uodate successfully',
        user,
    });
}


export const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({ msg: 'The user desactived susccessfully', user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Contacta al ADMINISTRATOR' });
    }
};