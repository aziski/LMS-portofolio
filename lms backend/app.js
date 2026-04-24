import express from 'express'
import cors from 'cors'
import accountRouter from './Routers/accountRouter.js'
import errHandler from './Midleweres/errHandler.js'

const app = express()

// Midleweres
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

// Routers
app.use('/api/account', accountRouter)

// Error handler
app.use(errHandler)

export default app;