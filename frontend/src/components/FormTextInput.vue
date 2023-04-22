<template>
  <div class="form-group">
    <label v-if="props.label" :for="props.name"
      >{{ props.label }}
      <span class="star">{{ props.required ? "*" : "" }}</span></label
    >
    <input
      v-model="textValue"
      :type="props.type"
      :id="props.name"
      :placeholder="props.placeholder"
      :required="props.required ? true : null"
    />
    <span v-if="textIsValid" class="warning">{{ props.validate.message }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  name: String,
  label: String,
  type: { type: String, default: "text" },
  placeholder: String,
  required: { type: Boolean, default: true },
  validate: Object,
  initialValue: String,
});

const emit = defineEmits(["set-value"]);
const textValue = ref(
  props.initialValue.length > 0 ? props.initialValue : [""]
);

const emitChange = () => {
  emit("set-value", textValue.value);
};

const textIsValid = computed(() => {
  return (
    textValue.value && textValue.value.length > 0 && !props.validate.isValid
  );
});

watch(textValue, emitChange);
</script>

<style scoped>
.star {
  color: #f2580a;
  margin-left: 3px;
}

.form-group {
  width: 100%;
  margin-bottom: 10px;
}

label {
  margin-left: 0.2rem;
  margin-top: 0.7rem;
  display: flex;
  margin-bottom: 5px;
}

input {
  margin-top: 0.5rem;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: black;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #f2f2f2 inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: black !important;
}

.warning {
  color: rgb(217, 27, 27);
  font-size: 12px;
}
</style>
