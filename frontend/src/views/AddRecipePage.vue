<template>
  <add-edit-recipe-form
    :initialData="null"
    :postUrl="'addRecipe'"
  ></add-edit-recipe-form>
</template>

<script setup>
import AddEditRecipeForm from "../features/AddEditRecipeForm.vue";
</script>
