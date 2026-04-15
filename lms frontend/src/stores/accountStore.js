import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('counter', () => {
  const isLogin = false

  return { isLogin }
})
