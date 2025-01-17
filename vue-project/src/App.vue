<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Customers from './components/Customers.vue'


function test() {
    console.log("OnClose")
    show.value = false
}

const show = ref(!false)
</script>

<template>

<NavBar/>

<div class="container my-3">
    <Customers/>
</div>

</template>
