<script setup>
    import { X } from 'lucide-vue-next';
    import { useBookStore } from '@/stores/bookStore.js';
    import { ref } from 'vue';
    import api from '@/api';

    const bookStore = useBookStore()
    const judul = ref('')
    const selectedFile = ref(null)
    const deskripsi = ref('')
    const jumlahHalaman = ref(0)
    const penulis = ref('')
    const tglRilis = ref('')
    const bahasa = ref('')
    const stok = ref(0)
    const genre = ref('')

    const handleFile = (e) => {
        const file = e.target.files[0]
        if(file) {
            selectedFile.value = file
        }
    }
    
    const addBook = async () => {
        try {
            const penulisArray = penulis.value
            .split(',')
            .map(nama => nama.trim())
            .filter(nama => nama !== '')

            const formData = new FormData()
            formData.append('judul', judul.value)
            formData.append('sampul', selectedFile.value)
            formData.append('deskripsi', deskripsi.value)
            formData.append('jumlahHalaman', jumlahHalaman.value)
            formData.append('penulis', penulisArray)
            formData.append('tglRilis', tglRilis.value)
            formData.append('bahasa', bahasa.value)
            formData.append('stok', stok.value)
            formData.append('genre', genre.value)

            const response = await api.post(`http://localhost:5003/api/book/add`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            alert(response.data.message)
            bookStore.books.push(response.data.newBook)

            judul.value = ''
            selectedFile.value = null
            deskripsi.value = ''
            jumlahHalaman.value = 0
            penulis.value = ''
            tglRilis.value = ''
            bahasa.value = ''
            stok.value = 0
            genre.value = ''

            bookStore.isShowAddBook = false
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }
</script>

<template>
    <teleport to='body'>
        <div class="bg-black/20 fixed top-0 left-0 right-0 bottom-0 flex z-50 justify-center items-center py-5">
            <div class="bg-white w-[80%] md:w-[70%] lg:w-[50%] max-h-full py-4 px-3 rounded-xl flex flex-col items-center gap-5 overflow-y-auto">
                <div class="w-full flex justify-end">
                    <component :is="X" :size="20" @click="bookStore.isShowAddBook = false" class="cursor-pointer" />
                </div>
                <p class="text-xl md:text-2xl font-bold">Tambah Buku Baru</p>
                <form action="#" @submit.prevent="addBook()" class="w-full h-full flex flex-col">
                    <label for="judul" class="text-sm md:text-lg lg:text-lg font-bold">Judul Buku</label>
                    <input type="text" name="judul" v-model="judul" placeholder="Masukan judul buku" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                    <label for="sampul" class="text-sm md:text-lg lg:text-lg font-bold">Sampul Buku</label>
                    <input type="file" accept=".jpg, .jpeg, .png, .webp, .svg" name="sampul" @change="handleFile" class="cursor-pointer text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                    <label for="deskripsi" class="text-sm md:text-lg lg:text-lg font-bold">Deskripsi Buku</label>
                    <textarea name="deskripsi" rows="5" v-model="deskripsi" placeholder="Masukan deskripsi buku" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400"></textarea>
                    <label for="jumlahHalaman" class="text-sm md:text-lg lg:text-lg font-bold">Jumlah Halaman Buku</label>
                    <input type="number" name="jumlahHalaman" v-model="jumlahHalaman" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                    <label for="penulis" class="text-sm md:text-lg lg:text-lg font-bold">Penulis Buku</label>
                    <input type="text" name="penulis" v-model="penulis" placeholder="Masukan nama penulis buku" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                    <label for="tglRilis" class="text-sm md:text-lg lg:text-lg font-bold">Tanggal Rilis Buku</label>
                    <input type="date" name="tglRilis" v-model="tglRilis" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                    <label for="bahasa" class="text-sm md:text-lg lg:text-lg font-bold">Bahasa Pada Buku</label>
                    <input type="text" name="bahasa" v-model="bahasa" placeholder="Masukan bahasa yang digunakan pada buku" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                    <label for="stok" class="text-sm md:text-lg lg:text-lg font-bold">Stok Buku</label>
                    <input type="text" name="bahasa" v-model="stok" placeholder="Masukan stok buku" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                    <label for="genre" class="text-sm md:text-lg lg:text-lg font-bold">Genre Buku</label>
                    <select name="genre" v-model="genre" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400 cursor-pointer">
                        <option value="" disabled selected hidden>Pilih genre buku</option>
                        <option value="programming">Pemograman</option>
                        <option value="computers">Teknologi & Komputer</option>
                        <option value="fiction">Fiksi & Sastra</option>
                        <option value="business">Bisnis & Ekonomi</option>
                    </select>
                    <button type="submit" class="mt-12 text-sm md:text-lg lg:text-lg text-white bg-blue-500 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">Tambah Buku</button>
                </form>
            </div>
        </div>
    </teleport>
</template>