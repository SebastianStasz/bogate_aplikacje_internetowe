<template>
  <div v-if="loadingData"><loading-indicator></loading-indicator></div>
  <add-edit-recipe-form
    v-else
    :initialData="data"
    :allCategory="data.allCategory"
    :postUrl="`editRecipe/${route.params.recipeId}`"
  ></add-edit-recipe-form>
</template>

<script setup>
import AddEditRecipeForm from "../features/AddEditRecipeForm.vue";
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
