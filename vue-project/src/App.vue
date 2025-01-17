<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import AdminView from './components/AdminView.vue'
import GuestView from './components/GuestView.vue'

const auth = ref(false)
</script>

<template>

<NavBar @auth="auth=$event"/>

<div class="container my-3">
    <AdminView v-if="auth" :auth="auth"/>

    <GuestView v-if="!auth" />
</div>

</template>
