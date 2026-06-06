import express from 'express'
import cors from 'cors'
import accountRouter from './Routers/accountRouter.js'
import bookRouter from './Routers/bookRouter.js'
import errHandler from './Midleweres/errHandler.js'

const app = express()

// Midleweres
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

// Static api
app.use('/sampul', express.static('sampul'))

// Routers
app.use('/api/account', accountRouter)
app.use('/api/book', bookRouter)

// Error handler
app.use(errHandler)

export default app;