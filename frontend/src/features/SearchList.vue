<template>
  <div>
    <v-icon
      v-if="!searchOpen"
      icon="mdi-triangle-down-outline"
      @click="searchOpen = !searchOpen"
    ></v-icon>
    <v-icon
      v-else
      icon="mdi-triangle-outline"
      @click="searchOpen = !searchOpen"
    ></v-icon>
    <SearchInputs
      :searchOpen="searchOpen"
      @send-value="($event) => (sendSearchParams.value = { ...$event })"
    />
  </div>
  <recipe-list :searchParams="sendSearchParams"></recipe-list>
</template>

<script setup>
import RecipeList from "../components/RecipeList.vue";
import SearchInputs from "../components/SearchInputs.vue";
import { reactive, ref } from "vue";

const searchOpen = ref(false);
const sendSearchParams = reactive({});
</script>

<style scoped></style>
