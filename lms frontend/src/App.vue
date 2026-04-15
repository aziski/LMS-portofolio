<script setup>
  import { RouterView, RouterLink, useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { LayoutDashboard, Book, Users, Repeat, UserPlus, Bell } from 'lucide-vue-next';

  const route = useRoute()

  const navData = [
    {name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard'},
    {name: 'Buku', icon: Book, path: '/buku'},
    {name: 'Anggota', icon: Users, path: '/anggota'},
    {name: 'Transaksi', icon: Repeat, path: '/transaksi'},
    {name: 'Tambah Staf', icon: UserPlus, path: '/tambahStaf'},
  ]

  const showNav = computed(() => {
    if(route.path === '/' || route.path === '/register') {
      return false
    }else {
      return true
    }
  })

  const page = computed(() => {
    return route.name
  })
</script>

<template>
  <div class="flex gap-1">
    <!-- Navbar 1 -->
    <nav v-if="showNav" class="flex flex-col h-screen py-1 px-4 bg-white shadow-sm">
      <img src="./components/icons/Logo.png" alt="Not found image" class="mb-5 w-45 h-15">
      <div class="flex flex-col w-full gap-1">
        <router-link v-for="item of navData" :key="item.name" :to="item.path" active-class="!text-blue-700 !bg-blue-100" class="flex gap-2 items-center sm:text-sm md:text-lg lg:text-lg py-1 px-2 rounded-md transition-colors hover:bg-gray-100">
          <component :is="item.icon" :size="20" />
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </nav>

    <div class="flex flex-col flex-1">
      <!-- Navbar 2 -->
      <div v-if="showNav" class="h-10 p-7 flex items-center bg-white shadow-sm justify-between">
        <p class="text-xl font-bold">{{ page }}</p>
        <div class="flex gap-3">
          <button class="cursor-pointer"><component :is="Bell"></component></button>
          <span class="border-2 border-gray-200"></span>
          <p>Super Admin</p>
        </div>
      </div>
      <!-- Content -->
      <routerView />
    </div>
  </div>
</template>