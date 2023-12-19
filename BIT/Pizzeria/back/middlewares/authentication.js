import jwt from "jsonwebtoken"

export const authVerification = (request, response, next)=> {
    try{
        if (!request.headers.authorization) {
            return response.json({ error: "Debes enviar un token de autenticación"})
        }
    
        let token = ""
    
        if (request.headers.authorization.includes("key")){
            token = request.headers.authorization.split("")[1]
        }else {
            return response.json({error: "El formato de token es incorrecto"})
        }
    
        let decoded = jwt.verify(token, process.env.JWT_KEY);

        //Se puede crear un middleware para que verifique si es admin
        
        // if (decoded.role != "admin") {
        //     return response.json({error: "No tienes permiso"})
        // }

        request.user = decoded
        next()

    }catch (e){
        return response.json(e)
    }
}