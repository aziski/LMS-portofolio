import connectDB from "./Config/db.js";
import app from "./app.js";
import dotenv from 'dotenv'
dotenv.config()

connectDB()

const port = process.env.PORT
app.listen(port, () => {
    console.log('Server is run in http://localhost:5003')
})