<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import Modal from './components/Modal.vue'
import NavBar from './components/NavBar.vue'


function test() {
    console.log("OnClose")
    show.value = false
}

const show = ref(!false)
</script>

<template>

<NavBar/>

</template>
