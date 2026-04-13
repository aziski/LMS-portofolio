import mongoose from'mongoose'

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
    }
})

const Account = mongoose.model('Account', accountSchema)

export default Account;