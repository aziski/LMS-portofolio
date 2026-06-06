<script setup>
    import {UserPen, FileText, CalendarDays} from 'lucide-vue-next'

    defineProps(['item'])
</script>

<template>
    <div class="flex flex-col gap-3 mt-5 max-h-50 overflow-y-auto p-3 border-t-2 border-gray-300 transition-[height, transform] ease-in-out duration-500">
        <p class="font-bold text-lg">{{ item.Judul }}</p>
        <p>{{ item.Deskripsi }}</p>
        <div class="flex justify-end gap-4 items-center">
            <div class="flex gap-2">
                <component :is="UserPen" :size="20" />
                <p>{{ item.Penulis?.join(' & ') }}</p>
            </div>
            <div class="flex gap-2">
                <component :is="FileText" :size="20" />
                <p>{{ item.Jumlah_halaman }} Halaman</p>
            </div>
            <div class="flex gap-2">
                <component :is="CalendarDays" :size="20" />
                <p>{{ item.Tgl_rilis }}</p>
            </div>
        </div>
    </div>
</template>