import { Router } from 'express'
import wrapAsync from '../Utils/wrapAsync.js'
import { register, login, addFavBooks, getFavBooks, deleteFavBook } from '../Controllers/accountController.js'

const router = Router()

router.post('/', wrapAsync(register))
router.post('/login', wrapAsync(login))
router.patch('/favBook/:userID', wrapAsync(addFavBooks))
router.get('/favBooks/:userID', wrapAsync(getFavBooks))
router.delete('/favBooks/delete/:userID/:bookID', wrapAsync(deleteFavBook))

export default router;