import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

// Importar el modelo de usuario
import UserModel from './user.model.js';

async function connectToMongo() {
    try {
        await mongoose.connect(process.env.URI_MONGO || 'mongodb://localhost:27017/ProyectoFinalBim2', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado exitosamente.');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); 
    }
}

async function addUser(user) {
    try {
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(user.password, salt);

            await UserModel.create({
                name: user.name,
                email: user.email,
                username: user.username,
                password: hashedPassword,
                role: user.role,
                img: user.img,
                state: user.estado,
            });

            console.log(`Usuario agregado: ${user.email}`);
        } else {

        }
    } catch (error) {
        console.error(`Error al agregar el usuario con correo ${user.email}:`, error.message);
    }
}

async function addUsers() {
    await connectToMongo();

    const usersToInsert = [
        {
            name: "diego",
            email: "dbarton@kinal.edu",
            username: "dbarton",
            password: "123456",
            role: "PROGRAMADOR",
            state: "true",
        },
        {
            name: "diego",
            email: "dmarroquin@kinal.edu",
            username: "dmarroquin",
            password: "123456",
            role: "PROGRAMADOR",
            state: "true",
        },
        {
            name: "jose",
            email: "jmatias@kinal.edu",
            username: "jmatias",
            password: "123456",
            role: "PROGRAMADOR",
            state: "true",
        },
        {
            name: "hector",
            email: "hrodriguez@kinal.edu",
            username: "hrodriguez",
            password: "123456",
            role: "PROGRAMADOR",
            state: "true",
        },
        {
            name: "brandon",
            email: "bmendoza@kinal.edu",
            username: "bmendoza",
            password: "123456",
            role: "PROGRAMADOR",
            state: "true",
        },
        {
            name: "braulio",
            email: "braulio@kinal.edu",
            username: "becheveria",
            password: "123456",
            role: "PROGRAMADOR",
            state: "true",
        },
    ];

    for (const user of usersToInsert) {
        await addUser(user);
    }
}

export default addUsers;