<template>
  <div v-if="props.searchOpen" class="search-container">
    <FormTextInput
      :name="'recipeName'"
      :label="'Wyszukaj po nazwie'"
      :placeholder="'Nazwa'"
      :required="false"
      :validate="isLengthValid(searchValues.recipeName, 3)"
      @set-value="($event) => (searchValues.recipeName = $event)"
    />
    <FormTextInput
      :name="'preparationTimeFrom'"
      :label="'Czas przygotowania (od - do) min'"
      :type="'number'"
      :placeholder="'od'"
      :required="false"
      :validate="isPositiveNumber(searchValues.preparationTimeFrom)"
      @set-value="($event) => (searchValues.preparationTimeFrom = $event)"
    />
    <FormTextInput
      :name="'preparationTimeTo'"
      :label="'&nbsp'"
      :type="'number'"
      :placeholder="'do'"
      :required="false"
      :validate="isPositiveNumber(searchValues.preparationTimeTo)"
      @set-value="($event) => (searchValues.preparationTimeTo = $event)"
    />
    <FormTextInput
      :name="'ingredients'"
      :label="'Wyszukaj po składnikach'"
      :placeholder="'pomidor, ryż'"
      :required="false"
      :validate="isLengthValid(searchValues.ingredients, 2)"
      @set-value="($event) => (searchValues.ingredients = $event)"
    />
    <button @click="emit('send-value', searchValues)">Szukaj</button>
  </div>
</template>

<script setup>
import FormTextInput from "../components/FormTextInput.vue";
import {
  isLengthValid,
  isPositiveNumber,
} from "../shared/functions/validators";

import { reactive } from "vue";

const props = defineProps({
    searchOpen: Boolean,
});

const searchValues = reactive({
  recipeName: "",
  preparationTimeFrom: null,
  preparationTimeTo: null,
  ingredients: "",
});

const emit = defineEmits(["send-value"]);
</script>

<style scoped>
.search-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border: 3px solid rgb(252, 72, 1);
  color: black;
  border-radius: 13px;
}
</style>
