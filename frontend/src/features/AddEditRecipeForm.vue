<template>
  <div class="container">
    <div>Tutaj formularz dodawania / edycji przepisów</div>
    <FormTextInput
      :name="'description'"
      :label="'Opis przepisu'"
      :placeholder="'Napisz coś'"
      :validate="isLengthValid(formValues.description, 3)"
      :initialValue="formValues.description"
      @set-value="updateValue('description', $event)"
    />
    <list-input
      :initialValue="formValues.ingredientList"
      @set-value="updateValue('ingredientList', $event)"
    ></list-input>
    <button @click="parentLog">log current form values</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ListInput from "../components/ListInput.vue";
import FormTextInput from "../components/FormTextInput.vue";
import { isLengthValid } from "../shared/functions/validators";

const props = defineProps({
  initialData: Object | String,
});

const formValues = reactive({
  description: props.initialData?.description ?? "",
  ingredientList: props.initialData?.ingredientList ?? [
    "Pierwszy",
    "Drugi",
    "Trzeci",
  ],
});

const updateValue = (fieldName, emitValue) => {
  formValues[fieldName] = emitValue;
};

const parentLog = () => {
  console.log(formValues.description, formValues.ingredientList);
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

@media (max-width: 768px) {
  .container {
    width: 20rem;
  }
}
</style>
