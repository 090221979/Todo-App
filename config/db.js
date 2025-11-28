import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
export const connectDB = async ()=>
    {
        try
        {
            const conn = await mongoose.connect(process.env.MONGOOB_URI)
            console.log(`MongoDB connected: ${conn.connection.host}`)
        }
        catch(err)
        {
            console.error(`Error: ${error.message}`)
            process.exit(1)//1 = failed 0 = success
        }
    }