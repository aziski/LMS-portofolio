<script setup>
  import { RouterView, RouterLink, useRoute } from 'vue-router';
  import { computed, ref } from 'vue';
  import { useAccountStore } from './stores/accountStore.js';
  import { LayoutDashboard, Book, BookOpen, Users, Repeat, Settings, Bell, Menu, FilePlus } from 'lucide-vue-next';

  const route = useRoute()
  const accountStore = useAccountStore()

  const navData = [
    {name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', role: ['admin', 'user']},
    {name: 'Buku', icon: Book, path: '/buku', role: ['admin', 'user']},
    {name: 'Buku dipinjam', icon: BookOpen, path: '/bukuDipinjam', role: ['admin', 'user']},
    {name: 'Anggota', icon: Users, path: '/anggota', role: ['admin']},
    {name: 'Transaksi', icon: Repeat, path: '/transaksi', role: ['admin', 'user']},
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

  const isShowNavbar = ref(true)

  const page = computed(() => {
    return route.name
  })

  const filteredNav = computed(() => {
    return navData.filter(item =>  item.role.includes(accountStore.userData.Role))
  })
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- Navbar -->
    <nav v-if="showNavbar" :class="['flex flex-col bg-white shadow-xl transition-all duration-500 z-50 fixed top-0 bottom-0 left-0 lg:static', isShowNavbar ? 'w-64 p-4 translate-x-0z top-12 lg:top-0' : '-translate-x-full lg:translate-x-0 lg:w-20 lg:p-4 overflow-hidden']">
      <img src="./components/icons/Logo.png" alt="Not found image" v-if="isShowNavbar" class="mb-5 w-45 h-15 object-contain">
      <div class="flex flex-col w-full gap-2">
        <router-link v-for="item of filteredNav" :key="item.name" :to="item.path" active-class="!text-blue-700 !bg-blue-100" :class="['flex gap-2 items-center sm:text-sm md:text-lg lg:text-lg py-1 px-2 rounded-md transition-colors hover:bg-gray-100 duration-600', isShowNavbar ? 'justify-start' : 'justify-center']">
          <component :is="item.icon" :size="20" />
          <span v-if="isShowNavbar" class="whitespace-nowrap">{{ item.name }}</span>
        </router-link>
      </div>
    </nav>

    <div class="flex flex-col flex-1 min-w-0">
      <!-- Header -->
      <div v-if="showNavbar" class="h-14 w-full px-4 lg:px-7 flex items-center bg-white shadow-sm justify-between">
        <div class="flex gap-7 items-center relative">
          <button @click="isShowNavbar = !isShowNavbar" class="bg-white py-1 px-2 rounded-full cursor-pointer flex justify-center items-center shadow-md transition-all duration-600"><component :is="Menu" :size="20" class="text-blue-700" /></button>
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