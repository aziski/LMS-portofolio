import { Router } from 'express'
import wrapAsync from '../Utils/wrapAsync.js'
import { register, login } from '../Controllers/accountController.js'

const router = Router()

router.post('/', wrapAsync(register))
router.post('/login', wrapAsync(login))

export default router;