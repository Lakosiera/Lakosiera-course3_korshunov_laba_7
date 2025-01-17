<script lang="js" setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";
import Modal from '@/components/Modal.vue'

const show = ref(false)
const error = ref(null)

const formData = ref({
    username: "admin",
    password: "admin",
})

function toSubmit() {
    try {
        api.login(formData.value)
            .then((data) => {
                show.value = false
            })
    } catch (error) {
        error.value = err
    }
}

function login() {
    show.value = !show.value
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
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="#">Клиент</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Вклады</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Кредиты</a>
                    </li> -->
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li> -->
                </ul>
                <div class="d-flex" role="search">
                    <a href="http://localhost:8007/admin/" class="btn btn-link">Админка</a>
                    <button class="btn btn-outline-success" @click="login">Вход</button>
                </div>
            </div>
        </div>
    </nav>

    <!-- <div  v-if="show" class=""> -->
        <Modal @on-close="show = false" :show="show">
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
    <!-- </div> -->
    
</template>