import Reservacion from './reservaciones.model.js'
import User from '../users/user.model.js'
import Servicio from '../serviciosAdicionales/servicios.model.js'
import Evento from '../eventos/eventos.model.js'
import Habitacion from '../habitaciones/habitaciones.model.js'
import Hotel from '../hoteles/hoteles.model.js'



export const saveReservation = async (req, res) => {
    try {
        const userID = req.user.id        
        const data = req.body
        data.user = userID
        const userExist = await User.findOne({ _id: userID })
        if (!userExist) return res.status(404).send({ message: 'User not found or does not exist'})
        
        if(data.event){
            const event = await Evento.findOne({ _id: data.event })
            if (!event) return res.status(404).send({ message: 'Event not found or does not exist'})

            if (data.startDate > data.endDate) {
                return res.status(400).send({ message: 'End date cannot be before start date'});
            }
            const eventExist = await Reservacion.findOne(
                {
                    event: data.event,
                    startDate: { $lte: data.endDate },
                    endDate: { $gte: data.startDate }
                })
            if(eventExist){
                return res.status(500).send({ message: 'Event already reserved'});
            }
        }else{
            const room = await Habitacion.findOne({ _id: data.room })
            if (!room) return res.status(404).send({ message: 'Room not found or does not exist'})
            if (data.startDate > data.endDate) {
                return res.status(400).send({ message: 'End date cannot be before start date'});
            }
            const roomExist = await Reservacion.findOne(
                {
                    room: data.room,
                    startDate: { $lte: data.endDate },
                    endDate: { $gte: data.startDate }
                })
            if(roomExist){
                return res.status(500).send({ message: 'Room already reserved'});
            }else{
                room.looked += 1
                await room.save()
                const hotel = await Hotel.findOne({_id: room.hotel})
                hotel.looked += 1
                await hotel.save()
            }
        }
        const newReservation = Reservacion(data)

        const reservationSaved = await newReservation.save() 
        return res.send({ message: 'Reservation saved successfully', reservationSaved})
        
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error saving reservation', err })
    }
}

export const addService = async (req, res) => {
    try {

        const userID = req.user.id
        const { id } = req.params
        const data = req.body
        const service = await Servicio.findOne({ _id: data.service})
        if (!service) return res.status(404).send({ message: 'Service not found or does not exist' })
        const reservation = await Reservacion.findOne({ _id: id, user: userID})
        if(!reservation) return res.status(404).send({message: 'Error does not exist a reservation'})
        const existingServiceIndex = reservation.arrServices.findIndex(serv => serv.service.toString() === data.service)

        if (existingServiceIndex !== -1) {
            reservation.arrServices[existingServiceIndex].cant += 1;
            reservation.arrServices[existingServiceIndex].subtotal += service.price
        } else {
            reservation.arrServices.push({
                service: service._id,
                cant: 1,
                subtotal: service.price
            })
        }

        const savedReservation = await reservation.save()
        await savedReservation.populate('arrServices.service', ['tipoDeServicio', 'precio'])

        return res.send({ message: 'Service added successfully', savedReservation})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding a new service', error: err })
    }
}

export const deleteReservation = async(req, res) => {
    try{
        const userID = req.user.id

        const { id } = req.params

        const userExist = await User.findOne({_id: userID})
        if (!userExist) return res.status(404).send({ message: 'User not found or does not exist'})

        const reservationExist = await Reservacion.findOne({_id: id, user: userID})
        if(!reservationExist) return res.status(404).send({message: 'Reservation not exists or you do not have permissions'})
        await Reservacion.findOneAndDelete({_id: id})
        return res.send({message: 'Reservation deleted succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting reservation'})
    }
}
 
export const getReservations = async(req, res) => {
    try{
        const userID = req.user.id
        const reservations = await Reservacion.find({user: userID}).populate('User', 
            ['name', 'username']).populate('Habitacion', ['tipoDeHabitacion', 'price']).populate('Eventos', ['tipoDeEvento', 'precio']).populate('arrServices.service', 
                ['type', 'price'])
        if(!reservations) return res.status(404).send({message: 'You dont have reservations yet'})
                return res.send({message: 'Reservations found:', reservations})
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting reservations'})
    }
}

export const getReservationRoom = async(req, res) => {
    try{

        const reservations = await Reservacion.find()

        const roomIds = reservations.filter(reservation => reservation.room).map(reservation => reservation.room)


        const reservedRooms = await Room.find({ _id: { $in: roomIds } })


        return res.send({message: 'Rooms reserveds', reservedRooms })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting room reserveds'})
    }
}

export const getReservedUser = async(req, res) => {
    try{

        const users = await Reservacion.find()

        const usersId = users.filter(reservation => reservation.user).map(reservation => reservation.user)


        const reservedUsedr = await User.find({ _id: { $in: usersId } })


        return res.send({message: 'Users reserveds', reservedUsedr })
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting users reserveds'})
    }
}

