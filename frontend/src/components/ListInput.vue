<template>
  <div>Tutaj formularz listy</div>
  <button @click="addNewLine">nowa linijka</button>
  <div v-for="(el, index) in listValue">
    <input v-model="listValue[index]" :key="index" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

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

const addNewLine = () => {
  listValue.value.push("nowa linijka");
};

watch(listValue, emitChange);
</script>
