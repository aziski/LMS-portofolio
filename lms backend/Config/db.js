import mongoose from 'mongoose'

async function connectDB() {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/lms')
        console.log('Connected to database')
    } catch (error) {
        alert(error.message)
    }
}

export default connectDB;