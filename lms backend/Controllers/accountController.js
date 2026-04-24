import errCustom from "../Utils/errCustom.js";
import bcrypt from 'bcrypt'
import Account from "../Models/accountModel.js";

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