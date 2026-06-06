<script setup>
    import userView from '@/components/Buku/userView.vue';
    import adminView from '@/components/Buku/adminView.vue';
    import { useAccountStore } from '@/stores/accountStore.js';

    const accountStore = useAccountStore()
</script>

<template>
    <adminView v-if="accountStore.userData.Role === 'admin'"/>
    <userView v-if="accountStore.userData.Role === 'user'" />
</template>