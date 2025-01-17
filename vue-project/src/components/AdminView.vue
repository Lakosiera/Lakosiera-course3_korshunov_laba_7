<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";

const props = defineProps({
    auth: Boolean
})

const customersData = ref([])
const customers = ref([])

const emit = defineEmits(['onDeposit', 'onLoan'])

onMounted(() => {
    getData()
})

watch(
    () => props.auth,
    (newValue) => {
        getData()
    }
)

watch(
    customersData,
    (newValue) => {
        customers.value = newValue
    }
)

async function getData() {
    try {
        customersData.value = await api.customers()
    } catch (error) {
        customersData.value = []
    }
}

function filter(value) {
    const filter = value.toLowerCase()
    customers.value = customersData.value.filter((c) => {
        return c.first_name.toLowerCase().includes(filter) ||
            c.email.toLowerCase().includes(filter) ||
            c.address.toLowerCase().includes(filter)
    })
}

function deposit(customer) {
    emit('onDeposit', customer)
}

function loan(customer) {
    emit('onLoan', customer)
}
</script>

<template>
    <div class="card shadow mb-3">
        <div class="card-body">
            <h5 class="card-title">Клиены</h5>

            <div class="input-group mb-3">
                <span class="input-group-text">🔍</span>
                <input type="text" class="form-control" placeholder="Поиск" @input="filter($event.target.value)">
            </div>

            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ФИО</th>
                        <th scope="col">Почта</th>
                        <th scope="col">Адресс</th>
                        <th scope="col">Вклады</th>
                        <th scope="col">Займы</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, idx) in customers" v-if="customers.length > 0">
                        <th scope="row">{{ customer.id }}</th>
                        <td>{{ customer.first_name }}</td>
                        <td>{{ customer.email }}</td>
                        <td>{{ customer.address }}</td>
                        <td>
                            {{ customer.deposits.length }}
                            <button @click="deposit(customer)" type="button" class="btn btn-sm btn-dark">✏️</button>
                        </td>
                        <td>
                            {{ customer.loans.length }}
                            <button @click="loan(customer)" type="button" class="btn btn-sm btn-dark">✏️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>