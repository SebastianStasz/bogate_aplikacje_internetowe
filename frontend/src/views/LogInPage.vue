<script setup>
import { reactive } from 'vue'
const formValues = reactive({ login: 'JanNowak', password: 'a123456' })

const sendValues = () => {
    console.log('send values')
}
</script>


<template>
    <p>Strona logowania</p>
    <router-link to="/"><v-btn>Start</v-btn></router-link>
    <router-link to="/myrecipes"><v-btn>Moje przepisy</v-btn></router-link>
    <div><input size="50" v-model="formValues.login"></div>
    <div><input size="50" v-model="formValues.password"></div>
    <div><button @click="sendValues">Wyślij</button></div>
</template>