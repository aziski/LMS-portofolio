import mongoose from'mongoose'
import Book from './bookModel.js';
import { ref } from 'vue';

const accountSchema = mongoose.Schema({
    Nama: {
        type: String,
        required: [true, 'Tolong isi nama anda']
    },
    Jenis_kelamin: {
        type: String,
        required: [true, 'Tolong pilih jenis kelamin anda']
    },
    Tanggal_lahir: {
        type: Date,
        required: [true, 'Tolong isi tanggal lahir anda']
    },
    Alamat: {
        type: String,
        required: [true, 'Tolong isi alamat anda dengan benar']
    },
    Username: {
        type: String,
        required: [true, 'Tolong buat username anda']
    },
    Password: {
        type: String,
        required: [true, 'Tolong buat password anda']
    },
    Role: {
        type: String
    },
    Buku_favorit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
})

const Account = mongoose.model('Account', accountSchema)

export default Account;