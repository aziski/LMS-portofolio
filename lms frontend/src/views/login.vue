<script setup>
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';
    import axios from 'axios';
    import { useAccountStore } from '@/stores/accountStore';
    import { useRouter } from 'vue-router';

    const username = ref('')
    const password = ref('')
    const accountStore = useAccountStore()
    const router = useRouter()

    async function login() {
        try {
            const response = await axios.post('http://localhost:5003/api/account/login', {
                username: username.value,
                password: password.value
            })
            router.push('/dashboard')
            accountStore.isLogin = response.data.valid
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            }
        }        
    }
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="bg-white w-[90%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center py-4 px-4 rounded-xl shadow-2xl">
            <div class="h-13 flex items-center justify-between gap-5">
                <img src="../components/icons/login.png" alt="Not found image" class="h-full">
                <p class="text-xl lg:text-2xl font-bold">Login</p>
            </div>
            <form action="#" @submit.prevent="login()" class="flex flex-col w-full mt-7">
                <label for="username" class="text-sm md:text-lg lg:text-lg font-bold">Username</label>
                <input type="text" name="username" placeholder="Masukan username anda" v-model="username" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                <label for="password" class="text-sm md:text-lg lg:text-lg font-bold">Password</label>
                <input type="password" name="password" placeholder="Masukan password anda" v-model="password" class="text-sm md:text-lg lg:text-lg py-1 px-2 border-b-2 border-gray-300 outline-none focus:border-blue-500 transition-colors placeholder-gray-400">
                <button type="submit" class="mt-7 text-sm md:text-lg lg:text-lg text-white bg-blue-500 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">Login</button>
            </form>
            <div class="flex gap-2 mt-2">
                <p>Belum punya akun ? </p>
                <router-link to="/register" class="text-blue-700">Register</router-link>
            </div>
        </div>
    </div>
</template>