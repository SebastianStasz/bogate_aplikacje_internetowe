<template>
  <div>Tutaj formularz dodawania / edycji przepisów</div>
  <list-input
    :initialValue="formValues.ingredientList"
    @set-value="updateValue('ingredientList', $event)"
  ></list-input>
  <button @click="parentLog">parent</button>
</template>

<script setup>
import { reactive } from "vue";
import ListInput from "../components/ListInput.vue";
const props = defineProps({
  initialData: Object | String,
});
const formValues = reactive({
  ingredientList: props.initialData?.ingredientList ?? ["Pierwszy", "Drugi"],
});

const updateValue = (fieldName, emitValue) => {
  formValues[fieldName] = emitValue;
};

const parentLog = () => {
  console.log(formValues["ingredientList"]);
};
</script>
