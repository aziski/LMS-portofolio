import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    Judul: {
        type: String,
        required: true
    },
    Sampul: {
        type: String,
        required: true
    },
    Deskripsi: {
        type: String,
        required: true
    },
    Jumlah_halaman: {
        type: Number,
        required: true
    },
    Penulis: {
        type: [String],
        required: true
    },
    Stok: {
        type: Number,
        required: true,
        default: 0
    },
    Stok_tersedia: {
        type: Number,
        default: 0
    },
    Tgl_rilis: {
        type: String,
        required: true
    },
    Bahasa: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema)

export default Book