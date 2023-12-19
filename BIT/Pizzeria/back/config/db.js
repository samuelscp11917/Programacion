import mongoose, { connect } from "mongoose";

export const connectDatabase = async() => {
    try{
       await mongoose.connect(process.env.DB_URI)
       console.log("Conexión exitosa")
    }catch(e){
        console.log(e)
    }
}