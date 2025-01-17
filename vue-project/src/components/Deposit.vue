<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";

const emit = defineEmits(['close'])

const props = defineProps({
    customer: Object
})

const depositData = ref({
    amount: 1000,
})

function onClose() {
    emit('close')
}

async function readDeposit(customerId) {
    props.customer.deposits = await api.depositRead(customerId)
}

async function createDeposit() {
    try {
        await api.depositCreate(props.customer.id, depositData.value)
        await readDeposit(props.customer.id)
    } catch (err) {
        console.log(err)
    }
}

async function removeDeposit(depositId) {
    try {
        await api.depositDelete(props.customer.id, depositId)
        await readDeposit(props.customer.id)
    } catch (err) {
        console.log(err)
    }
}
</script>

<template>
    <div class="card shadow mb-3" v-if="customer">
        <div class="card-body">
            <h5 class="card-title">
                <div class="row">
                    <div class="col">Вклады</div>
                    <div class="col-auto"><button type="button" class="btn-close" aria-label="Close" @click="onClose"></button></div>
                </div>
            </h5>

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
                        <td class="row">
                            <div class="col"></div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-sm btn-dark" @click="removeDeposit(deposit.id)">❌</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card-footer">
            <form @submit.prevent="createDeposit">
                <div class="row g-2">
                    <div class="col">
                        <div class="input-group">
                            <span class="input-group-text">Сумма</span>
                            <input type="number" class="form-control" v-model="depositData.amount">
                        </div>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-success">Положить</button>
                    </div>
                </div> 
            </form>
        </div>
    </div>
</template>