import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('accountStore', () => {
  const isLogin = false
  const userData = ref({})

  return { isLogin, userData }
})