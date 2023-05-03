<template>
  <div>
    <div class="searchHeader">
      <h1>Wyszukiwanie</h1>
      <v-icon
        v-if="!searchOpen"
        icon="mdi-triangle-down-outline"
        size="x-large"
        @click="searchOpen = !searchOpen"
      ></v-icon>
      <v-icon
        v-else
        icon="mdi-triangle-outline"
        size="x-large"
        @click="searchOpen = !searchOpen"
      ></v-icon>
    </div>
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

<style scoped>
.searchHeader {
  display: flex;
  place-content: space-between;
}
</style>
