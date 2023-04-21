<template>
  <add-edit-recipe-form :initialData="currentData"></add-edit-recipe-form>
</template>

<script setup>
import AddEditRecipeForm from "../features/AddEditRecipeForm.vue";
const currentData = "tu będzie pobieranie obecnych danych przepisu z serwera";
</script>
