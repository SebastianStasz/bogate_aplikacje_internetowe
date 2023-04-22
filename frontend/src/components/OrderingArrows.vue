<template>
  <div v-if="props.maxIndex > 0" class="container">
    <button
      v-if="showUpArrow"
      @click="emit('change-order', props.listIndex - 1)"
    >
      <v-icon icon="mdi-arrow-up-bold-outline" size="x-large"></v-icon>
    </button>
    <div v-else class="placeholder"></div>
    <button
      v-if="showDownArrow"
      @click="emit('change-order', props.listIndex + 1)"
    >
      <v-icon icon="mdi-arrow-down-bold-outline" size="x-large"></v-icon>
    </button>
    <div v-else class="placeholder"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  listIndex: Number,
  maxIndex: Number,
});
const emit = defineEmits(["change-order"]);

const showUpArrow = computed(() => !(props.listIndex === 0));
const showDownArrow = computed(
  () => !(props.maxIndex === 0 || props.listIndex >= props.maxIndex)
);
</script>

<style scoped>
.container {
  display: flex;
  width: 72px;
  gap: 8px;
}
.placeholder {
  width: 32px;
}
</style>
