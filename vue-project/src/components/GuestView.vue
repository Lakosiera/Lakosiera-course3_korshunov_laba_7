<script setup lang="js">
import { ref, reactive, watch, onMounted } from 'vue'
import { api } from "@/services/api.service";

const guestData = ref(null)

onMounted(() => {
    getData()
})

async function getData() {
    try {
        guestData.value = await api.guestData()
    } catch (error) {
        guestData.value = null
    }
}
</script>

<template>
    <div class="row" v-if="guestData">
        <div class="col-md"></div>
        <div class="col">
            <div class="card shadow">
                <div class="card-body">
                    <h4 class="card-title">Клиентов</h4>
                    <p class="card-text h1 text-center">
                        {{ guestData.customers }}
                    </p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card shadow">
                <div class="card-body">
                    <h4 class="card-title">Вкладов</h4>
                    
                    <p class="card-text h1 text-center">
                        {{ guestData.deposits }}
                    </p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card shadow">
                <div class="card-body">
                    <h4 class="card-title">Займов</h4>
                    <p class="card-text h1 text-center">
                        {{ guestData.loans }}
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md"></div>
    </div>
</template>