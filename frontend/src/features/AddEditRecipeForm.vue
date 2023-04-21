<template>
  <div>Tutaj formularz dodawania / edycji przepisów</div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  initialData: Object | String,
});
const formValues = reactive({
  ingredientList: props.initialData?.ingredientList,
});
</script>
