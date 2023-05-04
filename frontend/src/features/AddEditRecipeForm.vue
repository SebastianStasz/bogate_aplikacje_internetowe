<template>
  <div class="container">
    <h2>Dodaj przepis</h2>

    <v-file-input clearable label="Zdjęcie przepisu"></v-file-input>

    <v-combobox label="Kategoria" :items="categories"></v-combobox>

    <FormTextInput
      :name="'preparationTime'"
      :label="'Czas przygotowania'"
      :placeholder="'Czas przygotowania (minuty)'"
      type="number"
      :validate="isPositiveNumber(formValues.preparationTime)"
      :initialValue="formValues.preparationTime"
      @set-value="updateValue('preparationTime', $event)"
    />

    <FormTextInput
      :name="'recipeName'"
      :label="'Nazwa przepisu'"
      :placeholder="'Nazwa'"
      :validate="isLengthValid(formValues.recipeName, 3)"
      :initialValue="formValues.recipeName"
      @set-value="updateValue('recipeName', $event)"
    />

    <FormTextInput
      :name="'description'"
      :label="'Opis przepisu'"
      :placeholder="'Napisz coś'"
      :validate="isLengthValid(formValues.description, 3)"
      :initialValue="formValues.description"
      @set-value="updateValue('description', $event)"
    />

    <h3>Składniki</h3>
    <list-input
      :initialValue="formValues.ingredients"
      @set-value="updateValue('ingredients', $event)"
    ></list-input>

    <h3>Przygotowanie</h3>
    <list-input
      :initialValue="formValues.preparation"
      @set-value="updateValue('preparation', $event)"
    ></list-input>

    <main-button @click="sendForm" title="Dodaj przepis"></main-button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ListInput from "../components/ListInput.vue";
import FormTextInput from "../components/FormTextInput.vue";
import MainButton from "../components/MainButton.vue";
import useState from "../shared/store/useState";
import {
  isLengthValid,
  isPositiveNumber,
} from "../shared/functions/validators";
import { postData } from "../shared/functions/postData";

const props = defineProps({
  initialData: Object,
  postUrl: String,
});
const { user } = useState();
const categories = [
  "Przystawki i dania wegetariańskie",
  "Zupy i chłodniki",
  "Sałatki i dressingi",
  "Makarony i dania z ryżu",
  "Potrawy z mięsa i ryb",
  "Desery i wypieki",
  "Napoje i koktajle",
  "Śniadania i brunch",
  "Potrawy grillowane i smażone",
];

const formValues = reactive({
  description: props.initialData?.description ?? "",
  preparationTime: props.initialData?.preparationTime ?? null,
  recipeName: props.initialData?.recipeName ?? "",
  preparation: props.initialData?.preparation ?? [],
  ingredients: props.initialData?.ingredients ?? [],
});

const updateValue = (fieldName, emitValue) => {
  formValues[fieldName] = emitValue;
};

const sendForm = () => {
  postData(formValues, { goTo: `/userRecipes/${user.value}` }, props.postUrl);
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border: 3px solid rgb(252, 72, 1);
  color: black;
  border-radius: 13px;
}

h2 {
  margin-bottom: 1rem;
}

h3 {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .container {
    width: 20rem;
  }
}
</style>
