<template>
  <div>Tutaj formularz listy</div>
  <button @click="addNewLine">nowa linijka</button>
  <div v-for="(el, index) in listValue">
    <FormTextInput
      :validate="isLengthValid(listValue[index], 3)"
      :initialValue="listValue[index]"
      @set-value="updateValue(index, $event)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FormTextInput from "./FormTextInput.vue";
import { isLengthValid } from "../shared/functions/validators";

const props = defineProps({
  initialValue: Object,
});
const emit = defineEmits(["set-value"]);
const listValue = ref(
  props.initialValue.length > 0 ? props.initialValue : [""]
);

const emitChange = () => {
  emit("set-value", listValue.value);
};

const updateValue = (index, emitValue) => {
  listValue.value[index] = emitValue;
  emitChange();
};

const addNewLine = () => {
  listValue.value.push("");
};
</script>
