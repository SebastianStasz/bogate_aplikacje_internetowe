<template>
  <div class="container">
    <div v-if="loadingData"><loading-indicator></loading-indicator></div>
    <div v-else class="wrapper">
      <div v-if="!isListEmpty" class="grid-list">
        <div v-for="recipe of recipesList" :key="recipe.id">
          <RecipeCard
            :recipeId="recipe.id"
            :title="recipe.recipeName"
            :description="recipe.description"
            :rating="recipe.rating"
            :photo="recipe.photo"
          ></RecipeCard>
        </div>
      </div>
      <h2 v-else>Brak przepisów</h2>
      <div class="pagination">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(recipesNumber / CONFIG.RECIPES_PER_PAGE)"
          :total-visible="5"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { postData } from "../shared/functions/postData";
import RecipeCard from "./RecipeCard.vue";
import LoadingIndicator from "./LoadingIndicator.vue";
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { CONFIG } from "../shared/constants/config";

const props = defineProps({
  searchParams: Object,
});
const route = useRoute();
const recipesList = ref([]);
const loadingData = ref(true);
const currentPage = ref(1);
const recipesNumber = ref(6);
const isListEmpty = computed(() => recipesList.value?.length === 0);

const getRecipes = async () => {
  loadingData.value = true;
  const data = await postData(
    props.searchParams.value,
    {},
    "recipesList",
    route.params.userName ? route.params.userName : "all",
    currentPage.value
  );
  recipesList.value = data.recipes;
  recipesNumber.value = data.recipesNumber;
  loadingData.value = false;
};

onMounted(() => {
  getRecipes();
});

watch(currentPage, () => {
  getRecipes();
});

watch(props.searchParams, () => {
  if (currentPage.value === 1) getRecipes();
  else currentPage.value = 1;
});
</script>

<style scoped>
.container {
  width: 100%;
  padding-left: 6rem;
  padding-right: 6rem;
}

.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(390px, 390px));
  grid-auto-rows: minmax(150px, 2fr);
  grid-gap: 90px;
  justify-content: center;
}

.pagination {
  padding-top: 64px;
}

h2 {
  text-align: center;
  color: red;
}
</style>
