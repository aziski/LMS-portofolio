<script setup>
  import { RouterView, RouterLink, useRoute } from 'vue-router';
  import { computed, ref } from 'vue';
  import { useAccountStore } from './stores/accountStore.js';
  import { useAppStore } from './stores/appStore.js';
  import { LayoutDashboard, Book, BookOpen, Users, Settings, Bell, Menu, FilePlus, FileClock, BarChart3 } from 'lucide-vue-next';

  const route = useRoute()
  const accountStore = useAccountStore()
  const appStore = useAppStore()

  const navData = [
    {name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', role: ['admin', 'user']},
    {name: 'Katalog Buku', icon: Book, path: '/buku', role: ['admin', 'user']},
    {name: 'Peminjaman Aktif', icon: BookOpen, path: '/bukuDipinjam', role: ['admin', 'user']},
    {name: 'Anggota', icon: Users, path: '/anggota', role: ['admin']},
    {name: 'Riwayat & Denda', icon: FileClock, path: '/riwayat', role: ['user']},
    {name: 'Laporan & Denda', icon: BarChart3, path: '/laporan', role: ['admin']},
    {name: 'Pengajuan', icon: FilePlus, path: '/pengajuan', role: ['admin']},
    {name: 'Pengaturan', icon: Settings, path: '/pengaturan', role: ['admin', 'user']},
  ]

  const showNavbar = computed(() => {
    if(route.path === '/' || route.path === '/register') {
      return false
    }else {
      return true
    }
  })

  const page = computed(() => {
    return route.name
  })

  const filteredNav = computed(() => {
    return navData.filter(item => item.role.includes(accountStore.userData.Role))
  })
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Navbar -->
    <nav v-if="showNavbar" :class="['flex flex-col bg-white shadow-xl transition-[width,transform] duration-300 ease-in-out z-40 fixed top-0 bottom-0 left-0 lg:static', appStore.isShowNavbar ? 'w-64 p-4 translate-x-0 top-12 lg:top-0' : '-translate-x-full lg:translate-x-0 lg:w-20 lg:p-4 overflow-hidden']">
      <img src="./components/icons/Logo.png" alt="Not found image" v-if="appStore.isShowNavbar" class="mb-5 w-45 h-15 object-contain">
      <div class="flex flex-col w-full gap-2">
        <router-link v-for="item of filteredNav" :key="item.name" :to="item.path" active-class="!text-blue-700 !bg-blue-100" :class="['flex gap-2 items-center sm:text-sm md:text-lg lg:text-lg py-1 px-2 rounded-md transition-all duration-300 hover:bg-gray-100', appStore.isShowNavbar ? 'justify-start' : 'justify-center']">
          <component :is="item.icon" :size="20" />
          <span :class="['whitespace-nowrap transition-all duration-300', appStore.isShowNavbar ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0 overflow-hidden']">{{ item.name }}</span>
        </router-link>
      </div>
    </nav>

    <div class="flex flex-col flex-1 min-w-0">
      <!-- Header -->
      <div v-if="showNavbar" class="h-14 w-full px-4 lg:px-7 flex items-center bg-white shadow-sm justify-between">
        <div class="flex gap-7 items-center relative">
          <button @click="appStore.isShowNavbar = !appStore.isShowNavbar" class="bg-white py-1 px-2 rounded-full cursor-pointer flex justify-center items-center shadow-md transition-all duration-600"><component :is="Menu" :size="20" class="text-blue-700" /></button>
          <p class="text-xl font-bold">{{ page }}</p>
        </div>
        <button class="cursor-pointer"><component :is="Bell"></component></button>
      </div>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-6 z-0">
        <routerView />
      </main>
    </div>
  </div>
</template>