import { defineStore } from "pinia";
import { ref } from "vue";

export const useBookStore = defineStore('bookStore', () => {
    const isShowAddBook = ref(false)
    const isShowUserDetailBook = ref(null)
    const books = ref([])

    return { isShowAddBook, isShowUserDetailBook, books }
})