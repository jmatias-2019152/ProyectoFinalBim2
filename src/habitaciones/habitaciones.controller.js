import Habitacion from '../habitaciones/habitaciones.model.js'; // Importa el modelo de Habitacion
import * as fs from 'fs'
import path from 'path';

export const agregarHabitacion = async(req, res)=>{
    try {
        const {roomName, description, price, hotel} = req.body
        const habitacion = new Habitacion({
            roomName:roomName, 
            description:description,
            price:price,
            hotel:hotel,
            image:'/imagenes/' + req.file.filename
        });
        await habitacion.save()
        res.send({message: 'Room saved successfully'})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error saving room', err})
    }
}

export const listarHabitacion = async(req, res)=>{
    try {
        const habitacion = await Habitacion.find().populate('Hotel', 'name')
        return res.send({habitacion})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:  `Error al mostrar habitaciones.`, err})
    }
}

// Obtener una habitación por su nombre
export const buscarHabitacion = async (req, res) => {
    try {
        const { search } = req.body
        const aprox = new RegExp(search, 'i')
        const rooms = await Habitacion.find({ roomName: aprox }).populate('Hotel', ['name', 'email'])
        if (!rooms) return res.status(404).send({ message: 'Room not found' })
        return res.send({ message: 'Room found', rooms })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error searching Room'})
    }
  }

  export const actualizarHabitacion = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params
        if (req.file) {
            const room = await Habitacion.findById(id);
            console.log(room.image)
            if (room.image) {
                const imagePath = '.' + room.image
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                } else {
                    console.warn('El archivo a eliminar no existe:', imagePath)
                }
            }
            data.image = '/imagenes/' + req.file.filename
        }

        const updatedRoom = await Habitacion.findByIdAndUpdate(id, data, { new: true })

        if (!updatedRoom) {
            return res.status(404).send({ message: 'Room not found or not updated' })
        }

        return res.send({ message: 'Room updated successfully', updatedRoom })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating room' })
    }
}

export const eliminarHabitacion = async(req, res)=>{
    try {
        const {id} = req.params

        const habitacion = await Habitacion.findOneAndDelete({_id:id})

        if(!habitacion){
            return res.status(404).send({message: `Habitacion no encontrada y no eliminada`})
        }else{
            return res.send({message:`Habitacion eliminada`, habitacion})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({message:`Error al eliminar habitacion`, error})
    }
}