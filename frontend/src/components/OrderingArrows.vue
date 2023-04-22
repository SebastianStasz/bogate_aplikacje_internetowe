<template>
  <div>
    <div v-if="showUpArrow" @click="reorderList(props.listIndex - 1)">
      UP {{ props.listIndex }} {{ props.test }}
    </div>
    <div v-if="showDownArrow" @click="reorderList(props.listIndex + 1)">
      DOWN {{ props.listIndex }} {{ props.test }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  listIndex: Number,
  maxIndex: Number,
});
const emit = defineEmits(["change-order"]);

const reorderList = (newIndex) => {
  emit("change-order", newIndex);
};
const showUpArrow = computed(() => !(props.listIndex === 0));
const showDownArrow = computed(
  () => !(props.maxIndex === 0 || props.listIndex >= props.maxIndex)
);
</script>
