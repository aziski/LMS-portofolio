import { Router } from 'express'
import wrapAsync from '../Utils/wrapAsync.js'
import { register } from '../Controllers/accountController.js'

const router = Router()

router.post('/', wrapAsync(register))

export default router;