<template>
    <div class="wrapper">
        <div v-for="recipe of recipes" :key="recipe.id">
            <RecipeCard :title="recipe.title" :description="recipe.description" :rating="recipe.rating"></RecipeCard>
        </div>
    </div>
</template>

<script setup>
import RecipeCard from './RecipeCard.vue';

const recipes = [
    { id: 1, title: "Some Recipe 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 4.5 },
    { id: 2, title: "Some Recipe 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 2.5 },
    { id: 3, title: "Some Recipe 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 4.0 },
    { id: 4, title: "Some Recipe 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 4.5 },
    { id: 5, title: "Some Recipe 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 4.5 },
    { id: 6, title: "Some Recipe 6", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 2.5 },
    { id: 7, title: "Some Recipe 7", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 4.0 },
    { id: 8, title: "Some Recipe 8", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 4.5 },
    { id: 9, title: "Some Recipe 9", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...", rating: 4.5 }
]
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
