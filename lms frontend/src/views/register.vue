<script setup>
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';
    import axios from 'axios';

    const nama = ref('')
    const jenisKelamin = ref('')
    const tanggalLahir = ref('')
    const username = ref('')
    const password = ref('')
    const konfirmPw = ref('')


    async function register() {
        if(konfirmPw.value === password.value) {
            const response = await axios.post('http://localhost:5003/api/account/', {
                nama: nama.value.toLocaleLowerCase(),
                jenisKelamin: jenisKelamin.value,
                tanggalLahir: tanggalLahir.value,
                username: username.value,
                password: password.value
            })
            alert(response.data.message)
        }else {
            alert('Pastikan anda memasukan password yang sama pada konfirmasi password')
        }

        nama.value = ''
        jenisKelamin.value = ''
        tanggalLahir.value = ''
        username.value = ''
        password.value = ''
        konfirmPw.value = ''
    }

</script>

<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="bg-white w-[90%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center py-4 px-4 rounded-xl shadow-2xl">
            <div class="h-13 flex items-center justify-between gap-5">
                <img src="../components/icons/register.png" alt="Not found image" class="h-full">
                <p class="text-xl lg:text-2xl font-bold">Register</p>
            </div>
            <form action="#" @submit.prevent="register()" class="flex flex-col w-full mt-7">
                <label for="nama" class="text-sm md:text-lg lg:text-lg font-bold">Nama lengkap</label>
                <input type="text" name="nama" placeholder="Masukan nama anda" v-model="nama" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                <label for="gender" class="text-sm md:text-lg lg:text-lg font-bold">Jenis kelamin</label>
                <select name="gender" v-model="jenisKelamin" class="text-sm md:text-lg lg:text-lg py-1 px-2 cursor-pointer outline-none border-b-2 border-gray-300 focus:border-blue-500 transition-colors">
                    <option value="" disabled selected hidden>Pilih jenis kelamin anda</option>
                    <option value="Pria">Pria</option>
                    <option value="Wanita">Wanita</option>
                </select>
                <label for="tl" class="text-sm md:text-lg lg:text-lg font-bold">Tanggal lahir</label>
                <input type="date" name="tl" v-model="tanggalLahir" class="text-sm md:text-lg lg:text-lg py-1 px-2 outline-none border-b-2 border-blue-500 cursor-pointer focus:border-blue-500 transition-colors">
                <label for="username" class="text-sm md:text-lg lg:text-lg font-bold">Username</label>
                <input type="text" name="username" placeholder="Buat username anda" v-model="username" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                <label for="password" class="text-sm md:text-lg lg:text-lg font-bold">Password</label>
                <input type="password" name="password" placeholder="Buat password anda" v-model="password" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                <label for="confirmPw" class="text-sm md:text-lg lg:text-lg font-bold">Konfirmasi password</label>
                <input type="password" name="confirmPw" placeholder="Masukan ulang password anda" v-model="konfirmPw" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                <button type="submit" class="mt-7 text-sm md:text-lg lg:text-lg text-white bg-blue-500 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">Register</button>
            </form>
            <div class="flex gap-2 mt-2">
                <p>Sudah punya akun ? </p>
                <router-link to="/" class="text-blue-700">Login</router-link>
            </div>
        </div>
    </div>
</template>