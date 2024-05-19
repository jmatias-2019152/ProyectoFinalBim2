import jwt from 'jsonwebtoken';
import User from '../users/user.model.js'

export const validarJWT = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization']

    if (!token){
        return res.status(401).send('A token is required for authentication')
    }

    try{
        token = token.replace(/^Bearer\s+/, '')
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)

        req.user = decoded
    }catch(e){
        console.log(e)
        return res.status(401).send('Invalid Token')
    }

    return next()
}

export const soloProgramador = async(req, res, next) => {
    try{
        const { user } = req
        console.log(user)
        if(!user || user.role !== 'PROGRAMADOR') return res.status(403).send({message: `You dont have access | username: ${user.username}`})
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send({message: 'Unhautorized role'})
    }
}

export const adminOCliente = async(req, res, next) =>{
    const { user } = req 
    const { id } = req.params
    const useRol = await User.findOne({_id: id})
        if(!user || user.role !== 'PROGRAMADOR'){
            if(user.id !== useRol.id) return res.status(403).send({message: `You dont have access | username: ${user.username}`})
            next()
        }else if(!user || useRol.role === 'PROGRAMADOR'){
            if(user.id !== useRol.id) return res.status(403).send({message: `You dont have access | username: ${user.username}`})
            next()
        }else{
            next()
        }
}