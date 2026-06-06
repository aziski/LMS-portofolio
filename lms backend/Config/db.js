import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to database')
    } catch (error) {
        alert(error.message)
    }
}

export default connectDB;