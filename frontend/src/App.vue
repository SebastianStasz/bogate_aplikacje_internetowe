<template>
  <v-app>
    <page-header></page-header>
    <v-main class="pa-0">
      <page-main></page-main>
      <page-footer></page-footer>
    </v-main>
  </v-app>
</template>

<script setup>
import PageHeader from './layout/PageHeader.vue'
import PageFooter from './layout/PageFooter.vue'
import PageMain from './layout/PageMain.vue'
</script>

<style></style>
