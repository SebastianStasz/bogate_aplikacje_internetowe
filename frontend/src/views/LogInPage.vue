<script setup>
import { reactive } from 'vue'
const formValues = reactive({ login: 'JanNowak', password: 'a123456' })

const sendValues = () => {
    console.log('send values')
}
</script>

<template>
    <p>Strona logowania</p>
</template>
