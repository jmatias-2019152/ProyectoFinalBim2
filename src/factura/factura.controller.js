import Factura from '../factura/factura.model.js'
import Reservacion from '../reservaciones/reservaciones.model.js'
import User from '../users/user.model.js'
import Habitacion from '../habitaciones/habitaciones.model.js'
import Evento from '../eventos/eventos.model.js'
import PDFDocument from 'pdfkit'



export const generateInvoice = async (req, res) => {
    try {

        const userID = req.user.id
        const { id } = req.params
        const reservation = await Reservacion.findOne({ _id: id, user: userID })
        if (!reservation)  return res.status(404).send({ message: 'Reservation not found for the user' })

        const newRooms = []
        const newEvents = []

        if(reservation.room){
           const startDate = new Date(reservation.startDate)
           const endDate = new Date(reservation.endDate);
           const cantNights = (endDate - startDate) / (1000 * 60 * 60 * 24)

           const roomExist = await Habitacion.findOne({_id: reservation.room})
           const roomSubtotal = cantNights * roomExist.price
           newRooms.push({
               room: reservation.room,
               nights: cantNights,
               subtotal: roomSubtotal
           })
        }else{
            const startDate = new Date(reservation.startDate)
            const endDate = new Date(reservation.endDate);
            const cantNights = (endDate - startDate) / (1000 * 60 * 60 * 24)

            let eventExist = await Evento.findOne({_id: reservation.event})

            const eventSubtotal = cantNights * eventExist.price
           
            newEvents.push({
               event: reservation.event,
               nights: cantNights,
               subtotal: eventSubtotal
            })

        }
        
        // Crear la factura
        const invoice = new Factura({
            date: new Date() - (6 * 60 * 60  * 1000),
            number: Math.floor(Math.random() * 10000),
            user: reservation.user,
            arrRooms: newRooms,
            arrEvents: newEvents,
            arrServices: reservation.arrServices,
            state: 'AUTHORIZED'
        })
        
        // Calcular el total
        let total = 0;
        if(reservation.room){
            for (const roomS of invoice.arrRooms) {
                total += roomS.subtotal
            }   
        }
        if(reservation.event){
            for (const event of invoice.arrEvents) {
                total += event.subtotal
            }
        }
        if(reservation.arrServices){
            for (const service of invoice.arrServices) {
                total += service.subtotal
            }
        }
        invoice.total = total
        
        // Guardar la factura
        const savedInvoice = await invoice.save()
        await savedInvoice.populate('arrRooms.room', ['roomName', 'price'])
        await savedInvoice.populate('arrEvents.event', ['type', 'price'])
        await savedInvoice.populate('arrServices.service', ['type', 'price'])

        const userFind = await User.findOne({_id: userID})

        // Generar el pdf de la factura
        const pdfDoc = new PDFDocument()

        // Configurar la respuesta HTTP para la descarga del PDF
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=Factura_${userFind.name}.pdf`,
        });

        // Conectar la salida del PDF con la respuesta
        pdfDoc.pipe(res)

        // Contenido del PDF
        pdfDoc.fontSize(20).text('Factura', { align: 'center', underline: true })
        pdfDoc.moveDown()
        pdfDoc.fontSize(12).text(`Fecha: ${new Date(invoice.date).toLocaleDateString()}`, {align: 'right'})
        pdfDoc.fontSize(12).text(`Número de factura: ${invoice.number}`)
        pdfDoc.text(`Cliente: ${userFind.name} ${userFind.surname}`)
        pdfDoc.moveDown()
        pdfDoc.moveDown()

        // Encabezados de columna en una sola línea
        const startY = pdfDoc.y;
        pdfDoc.fontSize(14).text('Producto', 100, startY);
        pdfDoc.text('Cantidad', 250, startY);
        pdfDoc.text('Subtotal', 400, startY);
        invoice.arrRooms.forEach((roomItem, index) => {
            const y = pdfDoc.y
            pdfDoc.fontSize(12).text(roomItem.room.roomName, 100, y);
            pdfDoc.text(roomItem.nights, 275, y);
            pdfDoc.text(roomItem.subtotal, 420, y);
            pdfDoc.moveDown(3);    

        });

        invoice.arrEvents.forEach((eventItem, index) => {
        const y = pdfDoc.y;
        pdfDoc.fontSize(12).text(eventItem.event.type, 100, y);
        pdfDoc.text(eventItem.nights, 275, y);
        pdfDoc.text(eventItem.subtotal, 420, y);
        pdfDoc.moveDown();    

        });

        if (invoice.arrServices.length > 0) {
            const y = pdfDoc.y
            pdfDoc.fontSize(12).text('Servicios extras', 100, y, {underline: true});
            invoice.arrServices.forEach((serviceItem, index) => {
                const y = pdfDoc.y
                pdfDoc.fontSize(12).text(serviceItem.service.type, 100, y);
                pdfDoc.text(serviceItem.cant, 275, y);
                pdfDoc.text(serviceItem.subtotal, 420, y);
                pdfDoc.moveDown();
            });
        }
        pdfDoc.fontSize(14).text(`Total: ${total}`, { align: 'right' });

        // Finalizar el documento PDF
        pdfDoc.end();
    } catch (err) {
        console.error(err);
        res.status(500).send({message: 'Error generating invoice'})
    }
}

export const invoiceRechazed = async(req, res) => {
    try{
        // Traer al usuario
        const userID =  req.user.id
        // Traer el id de la factura
        const { id } = req.params
        // Verificar que exista
        let invoiceExist = await Factura.findOne({_id: id, user: userID}).populate('arrRooms.Habitaciones', ['tipoDeHabitacion', 'price'])
        .populate('arrEvents.Eventos', ['tipoDeEvento', 'precio']).populate('arrServices.Servicio', ['tipoDeServicio', 'precio'])
        if(!invoiceExist) return res.status(404).send({message: 'Error, invoice not foun or not exist'})
        // Cambiar estado
        invoiceExist.state = 'RECHAZED'
        // Guardar cambios
        await invoiceExist.save()
        // Responder al usuario
        return res.send({message: 'Invoice rechazed successfully', invoiceExist})
    }catch(err){
        console.error(err)
        res.status(500).send({message: 'Error deleting envoice'})
    }
}

export const getInvoiceUser = async(req, res) => {
    try{
        // Traer el id del usuario
        const userID = req.user.id

        // Busacar la factura 
        let invoice = await Factura.find({user: userID, state: 'AUTHORIZED'}).populate('arrRooms.Habitaciones', ['tipoDeHabitacion', 'price'])
        .populate('arrEvents.Eventos', ['tipoDeEvento', 'precio']).populate('arrServices.Servicio', ['tipoDeServicio', 'precio'])
        if(!invoice) await  res.status(404).send({message: 'Error invoice not found or not exists'})
        // Responder al usuario 
        return res.send({message: 'Invoice found:', invoice})
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting invoices'})
    }
}

export const getAllInvoices = async(req, res) => {
    try{
        // Buscar la factura 
        let invoice = await Factura.find({state: 'AUTHORIZED'}).populate('arrRooms.Habitaciones', ['tipoDeHabitacion', 'price'])
        .populate('arrEvents.Eventos', ['tipoDeEvento', 'precio']).populate('arrServices.Servicio', ['tipoDeServicio', 'precio'])
        if(!invoice) await  res.status(404).send({message: 'Error invoice not found or not exists'})
        // Responder al usuario 
        return res.send({message: 'Invoice found:', invoice})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error getting invoices'})
    }
}
