<template>
  <div v-if="loadingData"><loading-indicator></loading-indicator></div>
  <recipe-details v-else :details-data="data"></recipe-details>
</template>

<script setup>
import RecipeDetails from "../components/RecipeDetails.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getData } from "../shared/functions/getData";

const route = useRoute();
const loadingData = ref(true);
const data = ref(null);

onMounted(async () => {
  loadingData.value = true;
  data.value = await getData("recipeDetails", route.params.recipeId);
  loadingData.value = false;
});
</script>
