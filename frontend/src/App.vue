<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <Suspense>
      <router-view></router-view>
    </Suspense>
  </v-app>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue'
</script>

<style scoped></style>
