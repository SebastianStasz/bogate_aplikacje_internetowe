<template>
    <div v-if="loadingData">Tu komponent pokazujący ładowanie</div>
    <div v-else class="wrapper">
        <div v-if="!isListEmpty" class="grid-list">
            <div v-for="recipe of recipesList" :key="recipe.id">
                <RecipeCard :title="recipe.title" :description="recipe.description" :rating="recipe.rating"></RecipeCard>
            </div>
        </div>
        <div v-else>Brak przepisów</div>
        <div class="pagination">
            <v-pagination
                v-model="currentPage"
                :length="Math.ceil(recipesNumber / CONFIG.RECIPES_PER_PAGE)"
                :total-visible="5"
            ></v-pagination>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getData } from '../shared/functions/getData';
import RecipeCard from './RecipeCard.vue';
import { computed } from '@vue/reactivity';
import { CONFIG } from '../shared/constants/config';

const recipesList = ref([])
const loadingData = ref(true)
const currentPage = ref(1)
const recipesNumber = ref(6)
const isListEmpty = computed(()=> recipesList.value?.length === 0)

const getRecipes = async () => {
    loadingData.value = true
    const data = await getData("recipesList", currentPage.value)
    recipesList.value = data.recipes
    recipesNumber.value = data.recipesNumber
    loadingData.value = false
};

onMounted(() => {
    getRecipes()
});

watch(currentPage, () => {
    getRecipes()
});

</script>

<style scoped>
.grid-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(390px, 390px));
    grid-auto-rows: minmax(150px, 2fr);
    grid-gap: 90px;
    justify-content: center;
}
.pagination {
    margin-top: 64px;
    margin-bottom: 32px;
}
.wrapper {
    background-color: #242424;
    padding-left: 90px;
    padding-right: 90px;
}
</style>
