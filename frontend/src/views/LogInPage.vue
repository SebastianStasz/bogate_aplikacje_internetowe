<script setup lang="ts">
    import { reactive } from 'vue'
    const formValues = reactive({ login: 'JanNowak', password: 'a123456' })

    const sendValues = () =>{
        console.log('send values')
    }
</script>


<template>
    <p>Strona logowania</p>
    <div><router-link to="/">Start</router-link></div>
    <div><router-link to="/myrecipes">Moje przepisy</router-link></div>
    <div><input size="50" v-model="formValues.login"></div>
    <div><input size="50" v-model="formValues.password"></div>
    <div><button @click="sendValues">Wyślij</button></div>
  </template>