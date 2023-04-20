<template>
  <v-app class="content">
    <navigation-bar></navigation-bar>
    <Suspense>
      <router-view></router-view>
    </Suspense>
    <footer-view></footer-view>
  </v-app>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue'
import FooterView from './components/FooterView.vue';
</script>

<style scoped>
.content {
  background-color: #242424;
}
</style>
