<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";


const customers = ref([])

onMounted(() => {
    try {
        api.customers()
            .then((data) => {
                customers.value = data
            })
    } catch (error) {
        console.log(error)
    }
})

function getData() {

}

</script>

<template>
    <div class="card shadow">
        <div class="card-body">
            <h5 class="card-title">Клиены</h5>

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
                    <tr v-for="(customer, idx) in customers">
                        <th scope="row">{{ idx }}</th>
                        <td>{{customer.first_name}}</td>
                        <td>{{customer.email}}</td>
                        <td>{{customer.address}}</td>
                        <td>{{customer.deposits.length}}</td>
                        <td>{{customer.loans.length}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>