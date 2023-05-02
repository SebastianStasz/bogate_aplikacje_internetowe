<template>
  <div class="search-container">
    <FormTextInput
      :name="'recipeName'"
      :label="'Wyszukaj po nazwie'"
      :validate="isLengthValid(searchValues.recipeName, 3)"
      @set-value="($event) => (searchValues.recipeName = $event)"
    />
    <FormTextInput
      :name="'preparationTime'"
      :label="'Czas przygotowania'"
      :validate="isLengthValid(searchValues.preparationTime, 3)"
      @set-value="($event) => (searchValues.preparationTime = $event)"
    />
    <FormTextInput
      :name="'ingredient'"
      :label="'Wyszukaj po składnikach'"
      :validate="isLengthValid(searchValues.ingredient, 3)"
      @set-value="($event) => (searchValues.ingredient = $event)"
    />
    <button @click="searchNow()">Szukaj</button>
  </div>
  <recipe-list :searchParams="sendSearchParams"></recipe-list>
</template>

<script setup>
import RecipeList from "../components/RecipeList.vue";
import FormTextInput from "../components/FormTextInput.vue";
import { isLengthValid } from "../shared/functions/validators";
import { reactive } from "vue";

const searchValues = reactive({
  recipeName: "",
  preparationTime: "",
  ingredient: "",
});
const sendSearchParams = reactive({});

const searchNow = () => {
  sendSearchParams.value = { ...searchValues };
};
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 16px;
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border: 3px solid rgb(252, 72, 1);
  color: black;
  border-radius: 13px;
}
</style>
