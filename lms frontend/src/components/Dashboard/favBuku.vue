<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import defaultCover from '@/components/icons/no cover.png'

    const books = ref([])

    // onMounted(async () => {
    //     try {
    //         const key = import.meta.env.VITE_BOOKS_API_KEY
    //         const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:programming&maxResults=20&key=${key}`)
    //         books.value = response.data.items
    //         console.log(books.value)
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // })
</script>

<template>
    <div class="bg-white rounded-xl p-4 shadow-md">
        <p class="text-lg font-bold">Buku Tervavorit</p>
        <div class="mt-7 flex flex-col gap-3 border-t-2 border-gray-200 overflow-y-auto max-h-80">
            <div class="py-1 px-2 border-b-2 border-gray-200 flex gap-4">
                <img src="" alt="not found image" class="w-20 h-full">
                <div>
                    <p class="text-sm md:text-lg lg:text-lg font-bold">Judul  buku</p>
                    <p class="text-gray-500">0 x di pinjam</p>
                </div>
            </div>
        </div>
    </div>
</template>