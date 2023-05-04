<template>
  <div v-for="(value, index) in listValue" class="list-container">
    <OrderingArrows
      :listIndex="index"
      :maxIndex="listValue.length - 1"
      @change-order="updateOrder(index, $event)"
    />
    <FormTextInput
      :key="listValue"
      :validate="isLengthValid(value, 2)"
      :initialValue="value"
      @set-value="updateValue(index, $event)"
    />
    <button v-if="listValue.length > 1" @click="deleteLine(index)">
      <v-icon icon="mdi-trash-can-outline" size="x-large"></v-icon>
    </button>
  </div>
  <button @click="addNewLine">
    <v-icon icon="mdi-plus-circle-outline" size="x-large"></v-icon> Dodaj nową
    pozycję
  </button>
</template>

<script setup>
import { ref } from "vue";
import FormTextInput from "./FormTextInput.vue";
import { isLengthValid } from "../shared/functions/validators";
import OrderingArrows from "./OrderingArrows.vue";

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

const deleteLine = (index) => {
  var arrCopy = [...listValue.value];
  arrCopy.splice(index, 1);
  listValue.value = [];
  listValue.value.push(...arrCopy);
  emitChange();
};

const updateOrder = (curIndex, newIndex) => {
  var arrCopy = [...listValue.value];
  arrCopy[curIndex] = listValue.value[newIndex];
  arrCopy[newIndex] = listValue.value[curIndex];
  listValue.value = [];
  listValue.value.push(...arrCopy);
  emitChange();
};
</script>

<style scoped>
.list-container {
  display: flex;
  gap: 16px;
}
</style>
