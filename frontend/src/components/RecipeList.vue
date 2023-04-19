<template>
    <v-container fluid>
        <div v-for="recipe of recipes" :key="recipe.id">
            <RecipeCard :title="recipe.title" :description="recipe.description"></RecipeCard>
        </div>
    </v-container>
</template>

<script setup>
import RecipeCard from './RecipeCard.vue';

const recipes = [
    { id: 1, title: "Recipe 1", description: "Recipe 1 description.", rating: 4.5 },
    { id: 2, title: "Recipe 2", description: "Recipe 2 description.", rating: 2.5 },
    { id: 3, title: "Recipe 3", description: "Recipe 3 description.", rating: 4.0 },
    { id: 4, title: "Recipe 4", description: "Recipe 4 description.", rating: 4.5 }
]
</script>

<style scoped></style>
