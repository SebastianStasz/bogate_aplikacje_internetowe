<template>
  <button @click="addNewLine">nowa linijka</button>
  <div v-for="(value, index) in listValue" class="list-container">
    <OrderingArrows
      :listIndex="index"
      :maxIndex="listValue.length - 1"
      @change-order="updateOrder(index, $event)"
    />
    <FormTextInput
      :key="listValue"
      :validate="isLengthValid(value, 3)"
      :initialValue="value"
      @set-value="updateValue(index, $event)"
    />
    <button>
      <v-icon icon="mdi-trash-can-outline" size="x-large"></v-icon>
    </button>
  </div>
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
