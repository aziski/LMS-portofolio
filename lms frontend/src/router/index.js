import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import dashboard from '@/views/dashboard.vue'
import buku from '@/views/buku.vue'
import anggota from '@/views/anggota.vue'
import transaksi from '@/views/transaksi.vue'
import pengaturan from '@/views/pengaturan.vue'
import bukuDipinjam from '@/views/bukuDipinjam.vue'
import pengajuan from '@/views/pengajuan.vue'
import { useAccountStore } from '@/stores/accountStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: dashboard,
      meta: {requiredAuth: true}
    },
    {
      path: '/buku',
      name: 'Buku',
      component: buku,
      meta: {requiredAuth: true}
    },
    {
      path: '/bukuDipinjam',
      name: 'Buku dipinjam',
      component: bukuDipinjam,
      meta: {requiredAuth: true}
    },
    {
      path: '/anggota',
      name: 'Anggota',
      component: anggota,
      meta: {requiredAuth: true}
    },
    {
      path: '/transaksi',
      name: 'Transaksi',
      component: transaksi,
      meta: {requiredAuth: true}
    },
    {
      path: '/pengajuan',
      name: 'Pengajuan',
      component: pengajuan,
      meta: {requiredAuth: true}
    },
    {
      path: '/pengaturan',
      name: 'Pengaturan',
      component: pengaturan,
      meta: {requiredAuth: true}
    },
  ],
})

export default router

router.beforeEach(async (to, from, next) => {
  const useAccount = useAccountStore()

  if(to.meta.requiredAuth && !useAccount.isLogin) {
    next({name: 'login'})
  }else if((to.name === 'login' || to.name === 'register') && useAccount.isLogin) {
    next({name: 'dashboard'})
  } else {
    next()
  }
})