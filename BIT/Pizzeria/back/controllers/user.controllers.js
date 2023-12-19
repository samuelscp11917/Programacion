import { userModel } from "../models/users.js";
//para contraseña encriptada
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createUser = async (request, response) => {
    try {

        let body = request.body
        //se accede a la password del body y el.hash encripta
        body.password = bcrypt.hashSync(body.password, parseInt(process.env.MASTER_KEY))

        let newUser = await userModel.create(body)

        const payload ={_id: newUser._id}

        let token = await jwt.sign(payload, process.env.JWT_KEY)
        
        const userData = {
            token,
            newUser
        }
        response.send(userData)

    }catch (e) {
        console.log(e)
        response.json(e)
    }
}

export const login = async (request, response) => {
    try{
        let body = request.body

        let userExist = await userModel.findOne({email : body.email})

        if(!userExist) {
            return response.json({error: "No existe un usuario con este gmail"})
        }

        const validationsPassword = bcrypt.compareSync(body.password, userExist.password)

        if (validationsPassword) {
            const payload = {_id: userExist._id}
            const token = jwt.sign(payload, process.env.JWT_KEY)

            //delete el password pq no es seguro, chambonada ponerlo undefined
            userExist.password = undefined
            const userData = {
                token,
                userExist
            }
            return response.json(userData)
        }else {
            return response.json ({error: "Credenciales incorrectas"})
        }

    }catch(e){
        console.log(e)
    }
}

export const getUser = async (request, response) => {
    try {
        let user = await userModel.find()
        response.json(user)

    }catch (e) {
        console.log(e)
        response.json(e)
    }
}