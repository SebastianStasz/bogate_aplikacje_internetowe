<template>
    <div v-if="loadingData">Tu komponent pokazujący ładowanie</div>
    <div v-else>
        <div v-if="!isListEmpty" class="wrapper">
            <div v-for="recipe of recipesList" :key="recipe.id">
                <RecipeCard :title="recipe.title" :description="recipe.description" :rating="4.5"></RecipeCard>
            </div>
        </div>
        <div v-else>Brak przepisów</div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getData } from '../shared/functions/getData';
import RecipeCard from './RecipeCard.vue';
import { computed } from '@vue/reactivity';

const recipesList = ref([])
const loadingData = ref(true)
const isListEmpty = computed(()=> recipesList.value?.length === 0)

onMounted(async () => {
    loadingData.value = true
    recipesList.value = await getData("recipesList")
    loadingData.value = false
});

</script>

<style scoped>
.wrapper {
    display: grid;
    background-color: #242424;
    grid-template-columns: repeat(auto-fit, minmax(390px, 390px));
    grid-auto-rows: minmax(150px, 2fr);
    grid-gap: 90px;
    justify-content: center;
    padding-left: 90px;
    padding-right: 90px;
}
</style>
