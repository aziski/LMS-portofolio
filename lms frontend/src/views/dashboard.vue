<script setup>
    import { Book, Users, BookOpen, Library, SquareArrowOutUpRight, Coins, AlertTriangle, Bookmark } from 'lucide-vue-next';
    import { useAccountStore } from '@/stores/accountStore.js';
    import { computed } from 'vue';
    import chart from '@/components/Dashboard/chart.vue';
    import aktivitas from '@/components/Dashboard/aktivitas.vue';
    import favBuku from '@/components/Dashboard/favBuku.vue';
import Dipinjam from '@/components/Dashboard/dipinjam.vue';

    const accountStore = useAccountStore()

    const summaryCards = [
        {title: 'Total buku', value: 0, icon: Book, role: 'admin'},
        {title: 'Anggota Aktif', value: 0, icon: Users, role: 'admin'},
        {title: 'Total Peminjaman', value: 0, icon: BookOpen, role: 'admin'},
        {title: 'Buku Tersedia', value: 0, icon: Library, role: 'admin'},
        {title: 'Buku Dipinjam', value: 0, icon: SquareArrowOutUpRight, role: 'user'},
        {title: 'Denda Tertagih', value: 0, icon: Coins, role: 'user'},
        {title: 'Buku Terlambat', value: 0, icon: AlertTriangle, role: 'user'},
        {title: 'Sisa Kuota Pinjam', value: 0, icon: Bookmark, role: 'user'}
    ]

    const filterSummaryCards = computed(() => {
        return summaryCards.filter(item => item.role === accountStore.userData.Role)
    })

    const dataChart = [10, 30, 50, 40, 50, 20]
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- Welcome word -->
        <p class="font-bold sm:text-xl md:text-2xl lg:text-3xl">Selamat datang, <span v-if="accountStore.userData.Role === 'admin'">admin</span> {{ accountStore.userData.Nama.split(' ')[0] }}!</p>
        <!-- Summary Cards -->
        <div class="w-full gap-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <!-- Card -->
            <div v-for="item of filterSummaryCards" :key="item.title" class="rounded-lg px-5 py-3 bg-white shadow-md flex items-center justify-start gap-4">
                <div class="p-3 rounded-lg bg-green-100">
                    <component :is="item.icon" size: 20 class="text-green-700"></component>
                </div>
                <div>
                    <p class="text-sm md:text-lg lg:text-lg">{{ item.title }}</p>
                    <p class="font-bold  text-xl md:text-2xl lg:text-2xl">{{ item.value }}</p>
                </div>
            </div>
        </div>
        <!-- Chart & Activity -->
        <div class="w-full min-h-80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 mt-6">
            <favBuku v-if="accountStore.userData.Role === 'admin' || accountStore.userData.Role === 'user'" />    
            <aktivitas v-if="accountStore.userData.Role === 'admin' || accountStore.userData.Role === 'user'" />
        </div>
        <chart :dataChart="dataChart" v-if="accountStore.userData.Role === 'admin'" />
        <dipinjam v-if="accountStore.userData.Role === 'user'" />
    </div>
</template>