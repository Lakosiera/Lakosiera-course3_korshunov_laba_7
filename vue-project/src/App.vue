<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import AdminView from './components/AdminView.vue'
import GuestView from './components/GuestView.vue'
import Deposit from './components/Deposit.vue'
import Loan from './components/Loan.vue'

const auth = ref(false)
const depositeCustomer = ref(null)
const loanCustomer = ref(null)

function deposit(customer) {
    depositeCustomer.value = customer
}

function loan(customer) {
    loanCustomer.value = customer
}

function depositHide() {
    depositeCustomer.value = null
}

function loanHide() {
    loanCustomer.value = null
}
</script>

<template>

<NavBar @auth="auth=$event"/>

<div class="container my-3" v-if="auth">
    <AdminView :auth="auth" @onDeposit="deposit" @onLoan="loan" v-if="depositeCustomer==null && loanCustomer==null"/>
    <Deposit :customer="depositeCustomer" @close="depositHide"/>
    <Loan :customer="loanCustomer" @close="loanHide"/>
</div>

<div class="container my-3" v-if="!auth">
    <GuestView />
</div>

</template>
