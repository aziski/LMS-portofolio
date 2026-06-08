<script setup>
    import { onMounted, ref } from 'vue';
    import { useAccountStore } from '@/stores/accountStore.js';
    import api from '@/api';
    import defaultCover from '@/components/icons/no cover.png'
    import {Trash} from 'lucide-vue-next'

    const accountStore = useAccountStore()
    const books = ref([])

    onMounted(async () => {
        try {
            const response = await api.get(`http://localhost:5003/api/account/favBooks/${accountStore.userData._id}`)
            books.value = response.data
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    })

    const deleteFavBook = async (userID, bookID) => {
        try {
            const response = await api.delete(`http://localhost:5003/api/account/favBooks/delete/${userID}/${bookID}`)
            alert(response.data.message)
            books.value = books.value.filter(item => item._id !== bookID)
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }
    }
</script>

<template>
    <div class="bg-white rounded-xl p-4 shadow-md h-full">
        <p class="text-lg font-bold">{{ accountStore.userData.Role === 'admin'? 'Buku Terfavorit' : 'Buku Favorit Saya' }}</p>
        <div class="mt-7 flex flex-col gap-3 border-t-2 border-gray-200 overflow-y-auto h-100">
            <!-- Book -->
            <div v-for="item of books" :key="item._id" class="w-full h-25 py-1 px-2 border-b-2 border-gray-200 flex justify-between">
                <div class="flex gap-4">
                    <img :src="item.Sampul ? (item.Sampul.startsWith('http') ? item.Sampul : `http://localhost:5003/sampul/${item.Sampul}`) : defaultCover" alt="not found image" class="w-20 h-full">
                    <div>
                        <p class="text-sm md:text-lg lg:text-lg font-bold">{{ item.Judul }}</p>
                        <p class="text-g">{{ item.Jumlah_halaman }} Halaman</p>
                    </div>
                </div>
                <div class="flex h-full items-center">
                    <component :is="Trash" :size="20" @click="deleteFavBook(accountStore.userData._id, item._id)" class="cursor-pointer hover:text-red-500" />
                </div>
            </div>
        </div>
    </div>
</template>