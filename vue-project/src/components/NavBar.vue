<script lang="js" setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";
import Modal from '@/components/Modal.vue'


const emit = defineEmits(['auth'])

const token = ref(null)
const show = ref(false)
const error = ref(null)

const formData = ref({
    username: "admin",
    password: "admin",
})

onMounted(() => {
    token.value = api.getToken()
    emit('auth', token.value != null)
})

async function toSubmit() {
    try {
        token.value = await api.login(formData.value)
        show.value = false
        emit('auth', true)
    } catch (err) {
        token.value = null
        error.value = err
        emit('auth', false)
    }
}

function login() {
    show.value = true
}

function logout() {
    api.logout()
    token.value = null
    emit('auth', false)
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">ОберБанк</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li> -->
                </ul>
                <div class="d-flex" role="search">
                    <a href="http://localhost:8007/admin/" class="btn btn-link">Django Админка</a>
                    <button v-if="!token" class="btn btn-outline-success" @click="login">Вход</button>
                    <button v-if="token" class="btn btn-outline-success" @click="logout">Выход</button>
                </div>
            </div>
        </div>
    </nav>

    <Modal @on-close="show=false" :show="show">
        <form @submit.prevent="toSubmit">
            <div class="mb-3">
                <input placeholder="Логин" type="text" class="form-control" name="username"
                    v-model.trim="formData.username">
            </div>
            <div class="mb-3">
                <input placeholder="Пароль" type="password" class="form-control" name="password"
                    v-model.trim="formData.password">
            </div>
            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Вход</button>
            </div>
        </form>
        <div v-if="error" class="alert alert-warning mt-3 mb-0" role="alert">
            {{ error }}
        </div>
    </Modal>
    
</template>