<template>
  <div class="homeContainer">
    <h1>Lista przepisów</h1>
    <SearchList />
  </div>
</template>

<script setup>
import SearchList from "../features/SearchList.vue";
</script>

<style scoped>
.homeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
