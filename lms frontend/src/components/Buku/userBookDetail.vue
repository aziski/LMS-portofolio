<script setup>
    import { BookOpen, Bookmark, FileText, UserPen, Info, CalendarDays, Languages, X } from 'lucide-vue-next';
    import { computed, ref } from 'vue';
    import defaultCover from '@/components/icons/no cover.png'
    import { useBookStore } from '@/stores/bookStore.js';

    const bookStore = useBookStore()
    const props = defineProps(['item'])

    const bookInfo = computed(() => [
        {icon: FileText, tag: 'Jumlah Halaman', value: `${props.item.Jumlah_halaman} Halaman`},
        {icon: UserPen, tag: 'Penulis', value: props.item.Penulis?.join(' & ')},
        {icon: CalendarDays, tag: 'Tanggal Rilis', value: props.item.Tgl_rilis},
        {icon: Languages, tag: 'Bahasa', value: `${props.item.Bahasa} (English)`},
        {icon: Info, tag: 'Status', value: props.item.Stok? 'Tersedia' : 'Tidak tersedia', class: props.item.Stok > 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}
    ]) 
</script>

<template>
    <teleport to='body' >
        <div class="fixed p-12 top-0 left-0 right-0 bottom-0 bg-black/20 z-50 w-full h-auto md:h-full flex justify-center items-start md:items-center">
            <div class="w-full md:w-220 h-full md:h-150 rounded-lg bg-white p-5 shadow-lg flex flex-col">
                <!-- Close buttom -->
                <div class="w-full flex justify-end mb-5">
                    <component :is="X" :size="20" class="cursor-pointer" @click="bookStore.isShowUserDetailBook = null" />
                </div>
                <!-- Imange & Book info -->
                <div class="w-full h-auto md:h-full min-h-0 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5">
                    <!-- Book image -->
                    <div class=" justify-self-center md:justify-self-auto w-65 flex flex-col items-center gap-10">
                        <img :src="item.Sampul ? (item.Sampul.startsWith('http') ? item.Sampul : `http://localhost:5003/sampul/${item.Sampul}`) : defaultCover" alt="not found image" class="w-full h-70">
                        <div class="w-full flex flex-col gap-3">
                            <button :class="['py-3 px-5 rounded-lg flex items-center justify-center text-center gap-3 leading-none', item.Stok_tersedia? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed']"><component :is="BookOpen" :size="20" /> Pinjam Buku</button>
                            <button class="py-3 px-5 border-2 rounded-lg cursor-pointer hover:bg-yellow-300 hover:transition-colors hover:duration-200 hover:border-none flex items-center justify-center text-center gap-3 leading-none"><component :is="Bookmark" :size="20" /> Tambah ke favorit</button>
                        </div>
                    </div>
                    <!-- Book info & Description -->
                    <div class="md:border-l-2 border-gray-300 border-t-2 md:border-t-0 flex flex-col gap-5 py-5 md:py-0 md:px-7 overflow-y-auto">
                        <!-- Book info -->
                        <p class="text-lg lg:text-xl font-bold">{{ item.Judul }}</p>
                        <div class="flex flex-col">
                            <div v-for="info of bookInfo" :key="info.tag" class="border-b-2 border-gray-300 flex justify-between items-center py-3">
                                <div class="flex gap-5 flex-1">
                                    <component :is="info.icon" :size="20" />
                                    <p class="leading-none">{{ info.tag }}</p>
                                </div>
                                <div class="w-[50%]">
                                    <p :class="['leading-none text-start', info.class]">{{ info.value }}</p>
                                </div>
                            </div>
                        </div>
                        <!-- Book description -->
                        <div class="flex flex-col gap-3">
                            <p class="font-bold">Deskripsi</p>
                            <p>{{ item.Deskripsi }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>