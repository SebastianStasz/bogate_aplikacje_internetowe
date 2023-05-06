<template>
  <div v-if="props.searchOpen" class="search-container">
    <div class="search-group">
      <FormTextInput
        ref="recipeNameInput"
        :name="'recipeName'"
        :label="'Wyszukaj po nazwie'"
        :placeholder="'Nazwa'"
        :required="false"
        :validate="isLengthValid(searchValues.recipeName, 3)"
        @set-value="($event) => (searchValues.recipeName = $event)"
      />
      <FormTextInput
        ref="ingredientsInput"
        :name="'ingredients'"
        :label="'Wyszukaj po składnikach'"
        :placeholder="'pomidor, ryż'"
        :required="false"
        :validate="isLengthValid(searchValues.ingredients, 2)"
        @set-value="($event) => (searchValues.ingredients = $event)"
      />
    </div>
    <div class="search-group">
      <FormTextInput
        ref="preparationTimeFromInput"
        :name="'preparationTimeFrom'"
        :label="'Czas przygotowania (od - do) min'"
        :type="'number'"
        :placeholder="'od'"
        :required="false"
        :validate="isPositiveNumber(searchValues.preparationTimeFrom)"
        @set-value="($event) => (searchValues.preparationTimeFrom = $event)"
      />
      <FormTextInput
        ref="preparationTimeToInput"
        :name="'preparationTimeTo'"
        :label="'&nbsp'"
        :type="'number'"
        :placeholder="'do'"
        :required="false"
        :validate="isPositiveNumber(searchValues.preparationTimeTo)"
        @set-value="($event) => (searchValues.preparationTimeTo = $event)"
      />
    </div>
    <div class="search-group">
      <v-combobox
        v-model="searchValues.category"
        label="Kategoria"
        :items="allCategory"
      ></v-combobox>
    </div>
    <MainButton :title="'Szukaj'" @click="emit('send-value', searchValues)" />
    <MainButton :title="'Resetuj'" @click="clearSearch" />
  </div>
</template>

<script setup>
import FormTextInput from "../components/FormTextInput.vue";
import MainButton from "./MainButton.vue";
import {
  isLengthValid,
  isPositiveNumber,
} from "../shared/functions/validators";
import { reactive, ref, onMounted } from "vue";
import { getData } from "../shared/functions/getData";

const props = defineProps({
  searchOpen: Boolean,
});

const initialValues = {
  recipeName: "",
  preparationTimeFrom: null,
  preparationTimeTo: null,
  ingredients: "",
  category: null,
};
const allCategory = ref([]);
const searchValues = reactive({ ...initialValues });

onMounted(async () => {
  var data = await getData("allCategories");
  allCategory.value = data.allCategory;
});

const emit = defineEmits(["send-value"]);

const recipeNameInput = ref(null);
const preparationTimeFromInput = ref(null);
const preparationTimeToInput = ref(null);
const ingredientsInput = ref(null);

const clearSearch = () => {
  emit("send-value", initialValues);
  recipeNameInput.value.resetValue();
  preparationTimeFromInput.value.resetValue();
  preparationTimeToInput.value.resetValue();
  ingredientsInput.value.resetValue();
  searchValues.category = null;
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border: 3px solid rgb(252, 72, 1);
  color: black;
  border-radius: 13px;
}

.search-group {
  display: flex;
  gap: 16px;
}

@media (max-width: 1000px) {
  .search-group {
    flex-direction: column;
  }
}
</style>
