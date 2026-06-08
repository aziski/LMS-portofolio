import errCustom from "../Utils/errCustom.js";
import bcrypt from 'bcrypt'
import Account from "../Models/accountModel.js";
import Book from "../Models/bookModel.js";

export const register = async (req, res, next) => {
    const {nama, jenisKelamin, tanggalLahir, username, password} = req.body

    if(nama && jenisKelamin && tanggalLahir && username && password) {
        const checkUser = await Account.findOne({Username: username})
        if(!checkUser) {
            const hashPw = await bcrypt.hash(password, 12)
            await Account.create({
                Nama: nama,
                Jenis_kelamin: jenisKelamin,
                Tanggal_lahir: tanggalLahir,
                Username: username,
                Password: hashPw,
                Role: 'user'
            })
            res.json({message: 'Successful add Super Admin'})
        }else {
            return next(new errCustom(400, `Username ${username} sudah terdaftar, mohon buat username lain`))
        }
    }else {
        return next(new errCustom(404, 'Tolong isi semua data'))
    }
}

export const login = async (req, res, next) => {
    const {username, password} = req.body

    if(username && password) {
        const checkUsername = await Account.findOne({Username: username})
        if(checkUsername) {
            const checkPw = await bcrypt.compare(password, checkUsername.Password)
            if(checkPw) {
                res.json({valid: true, userData: checkUsername})
            }else {
                return next(new errCustom(400, 'Username atau Password anda salah'))    
            }
        }else {
            return next(new errCustom(400, 'Username atau Password anda salah'))
        }
    }else {
        return next(new errCustom(404, 'Silahkan masukan username dan password anda'))
    }
}

export const addFavBooks = async (req, res, next) => {
    const {userID} = req.params
    const {bookID, bookName} = req.body

    if(!userID || !bookID) {
        return next(new errCustom(400, 'User id atau book id tidak terkirim'))
    }

    const add = await Account.findByIdAndUpdate(
        userID,
        {$addToSet: {Buku_favorit: bookID}}
    )

    if(add) {
        res.json({message: `Berhasil menambahkan buku ${bookName} ke daftar favorit`})
    }else {
        return next(new errCustom(500, 'Gagal menambahkan buku ke daftar favorit'))
    }
}

export const getFavBooks = async (req, res, next) => {
    const {userID} = req.params

    if(!userID) {
        return next(new errCustom(400, 'Tidak ada user id'))
    }

    const favBooks = await Account.findById(userID).populate('Buku_favorit')

    if(favBooks) {
        res.json(favBooks.Buku_favorit)
    }else {
        return next(new errCustom(500, 'Gagal mengambil buku favorit'))
    }
}

export const deleteFavBook = async (req, res, next) => {
    const {userID, bookID} = req.params

    if(!userID || !bookID) {
        return next(new errCustom(400, 'User id dan Book id tidak ada'))
    }

    const book = await Book.findById(bookID)
    const bookName = book.Judul

    const deletedData = await Account.findByIdAndUpdate(
        userID,
        {$pull: {Buku_favorit: bookID}},
    )

    if(deletedData) {
        res.json({message: `Berhasil hapus buku ${bookName} dari daftar favorit`})
    }else {
        return next(new errCustom(500, 'Gagal hapus buku'))
    }
}