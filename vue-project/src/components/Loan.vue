<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";
import Modal from '@/components/Modal.vue'

const emit = defineEmits(['close'])

const props = defineProps({
    customer: Object
})


let loanDate = new Date(Date.now())
const startDate = `${loanDate.getFullYear()}-${(loanDate.getMonth()+1).toString().padStart(2, "0")}-${loanDate.getDate()}`
loanDate =  new Date(new Date(loanDate).setMonth(loanDate.getMonth() + 12))
const endDate = `${loanDate.getFullYear()}-${(loanDate.getMonth()+1).toString().padStart(2, "0")}-${loanDate.getDate()}`

const loanData = ref({
    amount: 1000,
    purpose: "На рыбов",
    submitted_on: startDate,
    disbursement_on: endDate,
})

function onClose() {
    emit('close')
}

async function readLoan(customerId) {
    props.customer.loans = await api.loanRead(customerId)
}

async function createLoan() {
    try {
        await api.loanCreate(props.customer.id, loanData.value)
        await readLoan(props.customer.id)
    } catch (err) {
        console.log(err)
    }
}

async function removeLoan(loanId) {
    console.log(loanId)
    try {
        await api.loanDelete(props.customer.id, loanId)
        await readLoan(props.customer.id)
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
                    <div class="col">Займы</div>
                    <div class="col-auto"><button type="button" class="btn-close" aria-label="Close" @click="onClose"></button></div>
                </div>
            </h5>
            <p class="card-title"> {{ customer.id }}: {{ customer.first_name }}</p>
            
            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Цель</th>
                        <th scope="col">Дата Получения</th>
                        <th scope="col">Дата Погашения</th>
                        <th scope="col">Сумма</th>
                        <th scope="col">Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(loan, idx) in customer.loans" v-if="customer.loans.length > 0">
                        <th scope="row">{{ loan.id }}</th>
                        <td>{{ loan.purpose }}</td>
                        <td>{{ loan.submitted_on }}</td>
                        <td>{{ loan.disbursement_on }}</td>
                        <td>{{ loan.amount }}</td>
                        <td class="row">
                            <div class="col"></div>
                            <div class="col-auto">
                                <button type="button" class="btn btn-sm btn-dark" @click="removeLoan(loan.id)">❌</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card-footer">
            <form @submit.prevent="createLoan">
                <div class="row g-2">
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">Сумма</span>
                            <input type="number" class="form-control" v-model="loanData.amount">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">Цель</span>
                            <input type="text" class="form-control" v-model="loanData.purpose">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">Дата займа</span>
                            <input type="date" class="form-control" v-model="loanData.submitted_on">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">Погасит до</span>
                            <input type="date" class="form-control" v-model="loanData.disbursement_on">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">Заняить</button>
                        </div>
                    </div>
                </div> 
            </form>
        </div>
    </div>
</template>