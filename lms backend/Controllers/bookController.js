import errCustom from "../Utils/errCustom.js";
import axios from "axios";
import Book from "../Models/bookModel.js";
import translate from "google-translate-api-x";
import dotenv from 'dotenv'
dotenv.config()

export const addNewBook = async (req, res, next) => {
    const {judul, deskripsi, jumlahHalaman, penulis, tglRilis, bahasa, stok, genre} = req.body
    
    if(!req.file) {
        return next(new errCustom(404, 'Harap isi semua inputan data dengan benar'))
    }
    const sampul = req.file.filename
    
    if(!judul || !deskripsi || !jumlahHalaman || !penulis || !tglRilis || !bahasa || !stok || !genre) {
        return next(new errCustom(404, 'Harap isi semua inputan data dengan benar'))
    }
    
    
    const duplicateCheck = await Book.findOne({Judul: {$regex: `^${judul}$`, $options: 'i'}})
    if(duplicateCheck) {
        return next(new errCustom(400, `Buku ${judul} sudah ada di database`))
    }

    const deskripsi_ID = await translate(deskripsi, {to: 'id'})
    
    const newBook = await Book.create({
        Judul: judul,
        Sampul: sampul,
        Deskripsi: deskripsi_ID.text,
        Jumlah_halaman: jumlahHalaman,
        Penulis: penulis,
        Stok: stok,
        Stok_tersedia: stok,
        Tgl_rilis: tglRilis,
        Bahasa: bahasa,
        Genre: genre
    })
    if(newBook) {
        res.json({newBook: newBook, message: 'Berhasil menambahkan buku baru'})
    }else {
        return next(new errCustom(500, 'Gagal menambahkan buku'))
    }
}

export const getBooks = async (req, res, next) => {
    const {genre, startIndex} = req.query

    if(!genre || !startIndex) {
        return next(404, 'startIndex dan maxResult tidak ada')
    }
    const books = await Book.find({Genre: genre}).skip(Number(startIndex)).limit(15)

    if(books) {
        res.json(books)
    }else {
        return next(new errCustom(500, 'Server error'))
    }
}

export const searchBook = async (req, res, next) => {
    const {s, genre} = req.query

    if(!s) {
        return next(400, 'Silahkan masukan judul buku yang ingin dicari')
    }
    const books = await Book.find({Judul: { $regex: `^${s}$`, $options: 'i' }, Genre: genre})

    if(books.length === 0) {
        res.json({showNotFound: true})
    }else {
        res.json(books)
    }
}

export const getBook = async (req, res, next) => {
    const {id} = req.params

    if(!id) {
        return next(new errCustom(400, 'ID buku tidak ada'))
    }

    const book = await Book.findOne({_id: id})
    if(book) {
        res.json(book)
    }else {
        return next(500, 'Server error')
    }
}

export const editStock = async (req, res, next) => {
    const {id} = req.params
    const {newStock} = req.body

    if(!id || !newStock) {
        return next(400, 'ID atau jumlah stok baru tidak ada')
    }

    const newData = await Book.findByIdAndUpdate(
        id,
        {Stok: newStock},
        {returnDocument: 'after', runValidators: true}
    )
    if(newData) {
        res.json(newData)
    }else {
        return next(new errCustom(500), 'Update data gagal')
    }
}