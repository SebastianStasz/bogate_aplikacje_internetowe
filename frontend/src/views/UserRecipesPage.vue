<template>
  <div class="userRecipesContainer">
    <h1>Przepisy użytkownika {{ route.params.userName }}</h1>
    <SearchList />
  </div>
</template>

<script setup>
import SearchList from "../features/SearchList.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped>
.userRecipesContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
