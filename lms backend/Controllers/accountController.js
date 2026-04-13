import errCustom from "../Utils/errCustom.js";
import bcrypt from 'bcrypt'
import Account from "../Models/accountModel,.js";

export const register = async (req, res, next) => {
    const {nama, jenisKelamin, tanggalLahir, username, password} = req.body

    if(nama && jenisKelamin && tanggalLahir && username && password) {
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
        return next(new errCustom(404, 'Not found register data'))
    }
}