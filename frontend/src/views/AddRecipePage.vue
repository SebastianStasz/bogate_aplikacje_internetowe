<template>
  <div v-if="loadingData"><loading-indicator></loading-indicator></div>
  <add-edit-recipe-form
    v-else
    :initialData="null"
    :allCategory="data.allCategory"
    :postUrl="'addRecipe'"
  ></add-edit-recipe-form>
</template>

<script setup>
import AddEditRecipeForm from "../features/AddEditRecipeForm.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import { ref, onMounted } from "vue";
import { getData } from "../shared/functions/getData";

const loadingData = ref(true);
const data = ref(null);

onMounted(async () => {
  loadingData.value = true;
  data.value = await getData("allCategories");
  loadingData.value = false;
});
</script>
