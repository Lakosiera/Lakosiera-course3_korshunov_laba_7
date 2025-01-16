<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import IconCat from './components/icons/IconCat.vue'
import IconDog from './components/icons/IconDog.vue'
import Modal from './components/Modal.vue'


function test() {
    console.log("OnClose")
    show.value = false
}

const show = ref(!false)
</script>

<template>
<button class="btn btn-primary" type="submit" @click="show = !show">Button: {{ show }}</button>

<Modal title="Pick a Pet" @on-close="test" :show="show">
    <div class="row px-2">
        <div class="btn-group _border p-0" role="group">
        <div class="btn btn-outline-secondary border border-0 p-2"><IconCat fill="yellow"/></div>
        <div class="btn btn-outline-secondary border border-0 p-2"><IconDog fill="green"/></div>
        </div>
    </div>
</Modal>

<!-- <Modal title="Pick a Pet" @on-close="test" :show="!show">
    <div class="row">
        <div class="col"><IconCat/></div>
        <div class="col"><IconDog/></div>
    </div>
</Modal> -->

</template>
