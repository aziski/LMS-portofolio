import { Router } from "express";
import multer from "multer";
import wrapAsync from "../Utils/wrapAsync.js";
import { addNewBook, getBooks, searchBook, getBook, editStock } from "../Controllers/bookController.js";

const router = Router()
const upload = multer({dest: 'sampul/'})

router.post('/add', upload.single('sampul'), wrapAsync(addNewBook))
router.get('/books', wrapAsync(getBooks))
router.get('/search', wrapAsync(searchBook))
router.get('/:id', wrapAsync(getBook))
router.patch('/editStock/:id', wrapAsync(editStock))

export default router