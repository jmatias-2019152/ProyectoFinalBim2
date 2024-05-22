import Evento from "../eventos/eventos.model.js";
import Hotel from '../hoteles/hoteles.model.js'
import path from "path";
import * as fs from 'fs'

// Obtener todos los eventos
export const listarEventos = async (req, res) => {
    try {
      let events = await Event.find().populate('Hotel', ['name', 'email'])
      return res.send(events) 
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: 'They can not be seen the Events' }) 
    }
  }

// Obtener un evento por su Nombre
export const buscarEvento = async (req, res) => {
    try {
        const { type } = req.body;
        if (!type) {
            return res.status(400).send({ message: 'Type is required' });
        }
        const regex = new RegExp(type, 'i');
  
        const evento = await Evento.find({ type: regex }).populate('hotel', ['name']);
        if (!evento || evento.length === 0) {
            return res.status(404).send({ message: 'No events found' });
        }
        return res.send({ message: 'Events found', evento });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error searching events' });
    }
  };

export const agregarEvento = async (req, res) => {
    try {
        const {tipoDeEvento,precio,hotel} = req.body
        const existingHotel = await Hotel.findById(hotel);
        if (!existingHotel) {
            return res.status(404).send({ message: 'Hotel not found' })
        }
        console.log(req.file)
        const evento = new Evento({
            tipoDeEvento: tipoDeEvento,
            precio:precio,
            hotel:hotel,
          image:'/imagenes/' + req.file.filename
        })
        await evento.save()
        return res.send({ message: 'Event saved successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error saving event  ' })
    }
};

// Actualizar un evento
export const actualizarEvento = async (req, res) => {
    try {
        const data = req.body
        const { id } = req.params
        if (req.file) {
            const evento = await Evento.findById(id)
            if (evento.image) {
                const imagePath = '.' + evento.image
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath)
                } else {
                    console.log('El archivo a eliminar no existe:', imagePath)
                }
            }
            data.image = '/imagenes/' + req.file.filename 
        }
        const updatedEvent = await Event.findByIdAndUpdate(id, data, { new: true }).populate('Hotel', ['name'])
        if (!updatedEvent) {
            return res.status(404).send({ message: 'Event not found and not updated' })
        }
        return res.send({ message: 'Event updated successfully', updatedEvent })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error updating event' })
    }
  }

  // Eliminar un evento
  export const eliminarEvento = async (req, res) => {
    try {
      const deletedEvento = await Evento.findByIdAndDelete(req.params.id) 
      if (!deletedEvento) {
        return res.status(404).send({ error: 'Event not found' }) 
      }
      res.send({message:'Event was delete succesfully', deletedEvento}) 
    } catch (error) {
      res.status(500).send({ error: 'Could not delete event' }) 
    }
  }


  export const imagen = async(req, res)=>{
    const { id } = req.params
    try{
        const evento = await Evento.findById(id)
        if(!evento) return res.status(404).send({message: 'Event not found'})
        const resolve = path.resolve(`src/${evento.image}`)
        return res.sendFile(resolve)
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error getting images'})
    }
  }