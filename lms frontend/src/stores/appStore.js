import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore('appStore', () => {
    const isShowNavbar = ref(true)

    return { isShowNavbar }
})