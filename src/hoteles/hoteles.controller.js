import Hotel from '../hoteles/hoteles.model.js'; // Importa el modelo de Hotel
import User from '../users/user.model.js'
import Categoria from '../categorias/categoria.model.js'
import * as fs from 'fs'
import path from 'path'

// Agregar hotel
export const agregarHotel = async (req, res) => {
    try {
        const userID = req.user.id
        const {name,categoria,dirección,email} = req.body
        const existingCategory = await Categoria.findById(categoria)
        if (!existingCategory) {
            return res.status(404).send({ message: 'Category not found' })
        }
        const hotel = new Hotel({
            name:name, categoria:categoria, direccion:dirección, email:email,user:userID,
            image:'/images/' + req.file.filename
        })

        await hotel.save()
        return res.send({ message: 'hotel saved successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error saving hotel' })
    }
};

// Obtener un hotel
export const listarHoteles = async (req, res) => {
    try {
        const userID = req.user.id

        let userFind = await User.find({_id: userID})
        if(!userFind)  return res.status(404).send({message: 'erro user not found'})
            console.log(userFind)
        if(userFind.role === 'MANAGER'){
            let hotels = await Hotel.findOne({user: userID}).populate('category', ['name'])

            return res.send(hotels)
            
        }else{
            let hotels = await Hotel.find().populate('category', ['name'])
            return res.send(hotels)
        }
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting hotels' })
    }
}

// Actualizar información de un hotel
export const actualizarHotel = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params
        if (req.file) {
            let hotel = await Hotel.findById(id)
            if (hotel.image) {
                const imagePath = '.' + hotel.image;
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                } else {
                    console.log('El archivo a eliminar no existe:', imagePath);
                }
            }
            data.image = '/images/' + req.file.filename
        }
        let updatedHotel = await Hotel.findByIdAndUpdate(id, data, { new: true }).populate('Categoria', ['name'])

        if (!updatedHotel) {
            return res.status(404).send({ message: 'Hotel not found or not updated' })
        }

        return res.send({ message: 'Hotel updated successfully', updatedHotel })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating hotel' })
    }
};

// Eliminar un hotel
export const eliminarHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id)
        if (hotel && hotel.image) {
            await deleteHotelImage(hotel.image)
        }
        await Hotel.deleteOne({ _id: id })

        // Responder
        return res.send({ message: 'Hotel deleted successfully' })
    } catch (error) {
        console.error('Error deleting hotel:', error);
        return res.status(500).send({ message: 'Error deleting hotel' })
    }
};

// Buscar hoteles
export const buscarHoteles = async (req, res)=>{
    try{
        const {name} = req.body
        const regex = new RegExp(name,'i')
        const hotels = await Hotel.find({name: regex}).populate('Categoria', ['name', 'email', 'direccion'])
        if(!hotels) return res.status(400).send({message: 'hotels not found'})
        return res.send({message:`hotels found`, hotels})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error searching hotels'})
    }

}