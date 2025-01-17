<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Customers from './components/Customers.vue'


function test() {
    console.log("OnClose")
    show.value = false
}

const show = ref(!false)
const auth = ref(false)


</script>

<template>

<NavBar @auth="auth=$event"/>

<div class="container my-3">
    <Customers :auth="auth"/>
</div>

</template>
