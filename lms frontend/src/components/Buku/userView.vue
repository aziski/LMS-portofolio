<script setup>
    import { Search } from 'lucide-vue-next';
    import { useAppStore } from '@/stores/appStore.js';
    import { useBookStore } from '@/stores/bookStore';
    import api from '@/api';
    import { ref, onMounted, watch } from 'vue';
    import defaultCover from '@/components/icons/no cover.png'
    import userBookDetail from './userBookDetail.vue';

    const appStore = useAppStore()
    const bookStore = useBookStore()
    const currentPage = ref(1)
    const isLoading = ref(false)
    const isNotFound = ref(false)
    const genre = ref('programming')
    const search = ref('')
    const totalDataPerPage = 15
    let controller = null

    const fetchData = async () => {

        if(controller) {
            controller.abort()
        }

        if(isNotFound.value) {
            isNotFound.value = false
        }

        if(bookStore.books) {
            bookStore.books = []
        }

        controller = new AbortController()

        isLoading.value = true

        try {
            const startIndex = (currentPage.value - 1) * totalDataPerPage
            
            const response = await api.get(`http://localhost:5003/api/book/books?genre=${genre.value}&startIndex=${startIndex}`, {
                signal: controller.signal
            })
            if(search.value && response.data.length === 0) {
                isNotFound.value = true
            }else {
                bookStore.books = response.data
            } 

        } catch(error) {
            if(error.name !== 'CanceledError') {
                console.log(error.message)
            }
        } finally {
            isLoading.value = false
        }
    }

    const nextPage = async () => {
        currentPage.value++
        await fetchData()
    }

    const prevPage = async () => {
        if(currentPage.value === 1) return
        currentPage.value--
        await fetchData()
    }

    const searching = async () => {
        currentPage.value = 1
        try {
            const response = await api.get(`http://localhost:5003/api/book/search?s=${search.value}&genre=${genre.value}`)
            if(response.data.showNotFound) {
                bookStore.books = []
                isNotFound.value = response.data.showNotFound
            }else {
                bookStore.books = response.data
                isNotFound.value = false
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }

    watch(genre, async () => {
        currentPage.value = 1
        await fetchData()
    })

    watch(search, async () => {
        if(!search.value) {
            await fetchData()
        }
    })

    onMounted(() => {
        fetchData()
    })
</script>

<template>
    <div class="flex flex-col gap-5 pb-5">
        <p class="text-xl lg:text-2xl text-center font-bold">Daftar Buku</p>

        <!-- Searching Form -->
        <form action="#" @submit.prevent="searching()" class="flex justify-center">
            <input type="text" name="search" placeholder="Cari buku" v-model="search" class="bg-black/4 outline-none focus:border-2 py-1 px-4 lg:text-lg rounded-l-full w-100">
            <button type="submit" class="py-1 px-3 bg-gray-300 rounded-r-full cursor-pointer"><component :is="Search" size="20"></component></button>
        </form>

        <!-- Choise of Genre -->
        <div class="flex gap-5">
            <p class="lg:text-lg">Genre :</p>
            <select v-model="genre" class="w-55 border-2 lg:text-lg cursor-pointer">
                <option value="programming" selected>Pemograman</option>
                <option value="computers">Teknologi & Komputer</option>
                <option value="fiction">Fiksi & Sastra</option>
                <option value="business">Bisnis & Ekonomi</option>
            </select>
        </div>

        <!-- Book List -->
        <div :class="['grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 lg:gap-3 mt-5', appStore.isShowNavbar? 'lg:grid-cols-5' : 'lg:grid-cols-6']">
            <!-- Book -->
            <div v-for="item of bookStore.books" :key="item.id" @click="bookStore.isShowUserDetailBook = item._id" class="rounded-lg h-85 bg-white shadow-md cursor-pointer">
                <img :src="item.Sampul ? (item.Sampul.startsWith('http') ? item.Sampul : `http://localhost:5003/sampul/${item.Sampul}`) : defaultCover" alt="not found image" class="w-full h-50">
                <div class="mt-3 flex flex-col gap-3 p-2">
                    <p class="text-lg font-bold line-clamp-2 min-h-15">{{ item.Judul }}</p>
                    <p class="text-end">{{ item.Jumlah_halaman === 0? 'E-Books' : item.Jumlah_halaman + ' Halaman' }}</p>
                </div>
                <!-- Book Detail -->
                <userBookDetail v-if="bookStore.isShowUserDetailBook === item._id" :item="item" />
            </div>
        </div>


        <!-- Notification Text -->
        <p v-if="isLoading" class="text-center text-lg">Loading...</p>
        <p v-if="isNotFound" class="text-center text-lg">Buku {{ search }} tidak ditemukan pada gendre ini</p>

        <!-- Pagination Bar -->
        <div class="flex justify-center items-center gap-5 mt-5">
            <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-300 rounded cursor-pointer disabled:opacity-50">Kembali</button>
            <p class="font-semibold">{{ currentPage }}</p>
            <button @click="nextPage" class="px-4 py-2 bg-gray-300 rounded cursor-pointer">Lanjut</button>
        </div>
    </div>
</template>