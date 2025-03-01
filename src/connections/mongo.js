import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const urlMongo = 'mongodb+srv://alejoferrari18:hxxix6zPqyaCetZx@clusterbati.fyjcn.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBati'

export const mongoConnection = async () => {
    
    try {
        await mongoose.connect(urlMongo,{dbName: 'EntregaFinalCoder'})
        .then(()=>{
            console.log("CONECTADO A LA BASE DE DATOS")
        })
    } catch (error) {
        console.log(e)
    }

}