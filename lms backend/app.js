import express from 'express'
import cors from 'cors'
import accountRouter from './Routers/accountRouter.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api/account', accountRouter)

export default app;