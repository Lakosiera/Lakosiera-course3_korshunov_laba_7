<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";
import Modal from '@/components/Modal.vue'

const emit = defineEmits(['close'])

const props = defineProps({
    customer: Object
})

const guestData = ref(null)

onMounted(() => {
    // getData()
})

// watch(
//     () => props.customer,
//     (newValue) => {
//         console.log(newValue)
//     }
// )

async function getData() {
    try {
        guestData.value = await api.guestData()
    } catch (error) {
        guestData.value = null
    }
}

function onClose() {
    show.value = false
    emit('close')
}

function remove(id) {
    // console.log(id)
}
</script>

<template>
    <div class="card shadow mb-3" v-if="customer">
        <div class="card-body">
            <h5 class="card-title"> Вклады</h5>
            <p class="card-title"> {{ customer.id }}: {{ customer.first_name }}</p>
            
            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(deposit, idx) in customer.deposits" v-if="customer.deposits.length > 0">
                        <th scope="row">{{ deposit.id }}</th>
                        <td>{{ deposit.amount }}</td>
                        <td class="">
                            <button type="button" class="btn btn-sm btn-dark" @click="remove(deposit.id)">❌</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>