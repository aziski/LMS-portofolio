<script setup>
    import { Search, Plus, Pen } from 'lucide-vue-next';
    import { useAppStore } from '@/stores/appStore.js';
    import api from '@/api';
    import { ref, onMounted, watch } from 'vue';
    import defaultCover from '@/components/icons/no cover.png'
    import addNewBook from './addNewBook.vue';
    import { useBookStore } from '@/stores/bookStore.js';
    import adminBookDetail from './adminBookDetail.vue';

    const appStore = useAppStore()
    const bookStore = useBookStore()
    const currentPage = ref(1)
    const isLoading = ref(false)
    const isNotFound = ref(false)
    const genre = ref('programming')
    const search = ref()
    const totalDataPerPage = 20
    let controller = null
    const isShowDetailBook = ref(null)
    const isEditStock = ref(null)

    const fetchData = async () => {

        if(controller) {
            controller.abort()
        }

        if(isNotFound.value) {
            isNotFound.value = false
        }

        if(bookStore.books) {
        bookStore.books= []
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

    const togleDetailBook = (id) => {
        if(isShowDetailBook.value === id) {
            isShowDetailBook.value = null
        }else {
            isShowDetailBook.value = id
        }
    }

    const togleEditStock = (id) => {
        if(isEditStock.value === id) {
            isEditStock.value = null
        }else {
            isEditStock.value = id
        }
    }

    const editStok = async (item) => {
        try {
            const response = await api.patch(`http://localhost:5003/api/book/editStock/${item._id}`, {
                newStock: item.Stok
            })
            const index = bookStore.books.findIndex(data => data._id === item._id)
            if(index !== -1) {
                bookStore.books[index] = response.data
                isEditStock.value = null
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }

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

        <!-- Choise of Genre & Add new book -->
        <div class="flex items-center justify-between">
            <div class="flex gap-5">
                <p class="lg:text-lg">Genre :</p>
                <select v-model="genre" class="w-55 border-2 lg:text-lg cursor-pointer">
                    <option value="programming" selected>Pemograman</option>
                    <option value="computers">Teknologi & Komputer</option>
                    <option value="fiction">Fiksi & Sastra</option>
                    <option value="business">Bisnis & Ekonomi</option>
                </select>
            </div>

            <div class="flex items-center">
                <button @click="bookStore.isShowAddBook = true" class="flex items-center justify-center gap-2 cursor-pointer leading-none w-30 px-2 py-2 text-green-700 bg-green-200 rounded-lg hover:bg-green-300"><component :is="Plus" :size="20" /> Buku</button>
                <addNewBook v-if="bookStore.isShowAddBook" />
            </div>
        </div>

        <!-- Book List -->
        <div class="flex flex-col gap-3">
            <!-- Book -->
            <div v-for="item of bookStore.books" :key="item._id" class="flex flex-col rounded-lg min-h-18 p-2 bg-white shadow-md">
                <div class="flex justify-between w-full h-full">
                    <div class="flex items-center gap-4 w-200">
                        <img :src="item.Sampul ? (item.Sampul.startsWith('http') ? item.Sampul : `http://localhost:5003/sampul/${item.Sampul}`) : defaultCover" alt="not found image" class="w-12 h-full">
                        <p @click="togleDetailBook(item._id)" class="text-lg font-bold line-clamp-1 hover:text-blue-500 cursor-pointer">{{ item.Judul }}</p>
                    </div>
                    <div class="flex justify-center items-center gap-10">
                        <p><span class="text-red-500">Stok:</span> {{ item.Stok_tersedia }} / {{ item.Stok }}</p>
                        <form action="#" v-if="isEditStock === item._id" @submit.prevent="editStok(item)" class="flex justify-center items-center gap-5">
                            <input type="number" v-model="item.Stok" class="text-center w-20 px-2 py-1 bg-gray-100 rounded-md">
                            <button type="submit" class="bg-blue-400 text-white px-2 py-1 w-15 rounded-md">Ubah</button>
                        </form>
                        <component :is="Pen" :size="20" @click="togleEditStock(item._id)" class="cursor-pointer" />
                    </div>
                </div>
                <!-- Book Detail -->
                <adminBookDetail v-if="isShowDetailBook === item._id" :item="item" />
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