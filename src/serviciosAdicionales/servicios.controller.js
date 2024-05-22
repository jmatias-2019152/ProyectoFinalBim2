import Servicio from './servicios.model.js'


export const agregarServicioAdicional = async (req, res) => {
    try {
        const { tipoDeServicio, descripcion, precio, hotel } = req.body;

        const servicio = new Servicio({
            tipoDeServicio,
             descripcion,
             precio,
             hotel
        });

        await servicio.save();

        return res.status(200).json({
            msg: "Servicio agregado exitosamente a la base de datos!",
            servicio
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("No se pudo agregar el servicio a la base de datos");
    }
};


export const buscarServicios = async (req, res)=>{
    try{
        const {type} = req.body
        const regex = new RegExp(type,'i')

        const servicio = await Servicio.find(    
            {type: regex}
        ).populate('Hotel', 'nombreHotel')

        if (!servicio || servicio.length === 0) {
            return res.status(404).send({ message: 'No events found' });
        }

        return res.send({message: 'services found', servicio })
    }catch(error){
        console.error(error)
        return res.status(500).send({message:'error searching services'})
    }
}



export const listarServicio = async(req, res)=>{
    try {
        const servicio = await Servicio.find().populate('Hotel', 'nombreHotel')
        return res.send(servicio)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting services'})
    }
}

export const editarServicio = async(req, res)=>{
    try {
        const data = req.body
        const {id} = req.params

        const servicio = await Servicio.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )

        if(!servicio){
            return res.status(404).send({message:'Servicio not found and not updated'})
        }else{
            return res.send({message: 'Updated service', servicio})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating service'})
    }
}

export const eliminarServicio = async(req, res)=>{
    try {
        const {id} = req.params

        const servicio = await Service.findOneAndDelete({_id: id})
        if(!servicio){
            return res.status(404).send({message: 'Service not found and not deleted'})
        }else{
            return res.send({message: 'Deleted service', servicio})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting service'})
    }
}