<template>
  <div class="container">
    <h2>Dodaj przepis</h2>

    <v-file-input
      accept="image/*"
      clearable
      label="Zdjęcie przepisu"
      @change="handleFileUpload"
    ></v-file-input>

    <v-combobox
      v-model="formValues.category"
      label="Kategoria"
      :items="allCategory"
    ></v-combobox>

    <FormTextInput
      :name="'preparationTime'"
      :label="'Czas przygotowania'"
      :placeholder="'Czas przygotowania (minuty)'"
      type="number"
      :validate="isPositiveNumber(formValues.preparationTime)"
      :initialValue="formValues.preparationTime"
      @set-value="updateValue('preparationTime', $event)"
    />

    <FormTextInput
      :name="'recipeName'"
      :label="'Nazwa przepisu'"
      :placeholder="'Nazwa'"
      :validate="isLengthValid(formValues.recipeName, 3)"
      :initialValue="formValues.recipeName"
      @set-value="updateValue('recipeName', $event)"
    />

    <FormTextInput
      :name="'description'"
      :label="'Opis przepisu'"
      :placeholder="'Napisz coś o przepisie'"
      :validate="isLengthValid(formValues.description, 3)"
      :initialValue="formValues.description"
      @set-value="updateValue('description', $event)"
    />

    <h3>Składniki</h3>
    <list-input
      :initialValue="formValues.ingredients"
      @set-value="updateValue('ingredients', $event)"
    ></list-input>

    <h3>Przygotowanie</h3>
    <list-input
      :initialValue="formValues.preparation"
      @set-value="updateValue('preparation', $event)"
    ></list-input>

    <main-button
      @click="sendForm"
      title="Dodaj przepis"
      :is-disabled="!isFormValid"
    ></main-button>
    <p v-if="!isFormValid" class="warning">
      Upewnij się że wszystkie pola są wypełnione!
    </p>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import ListInput from "../components/ListInput.vue";
import FormTextInput from "../components/FormTextInput.vue";
import MainButton from "../components/MainButton.vue";
import useState from "../shared/store/useState";
import {
  isLengthValid,
  isPositiveNumber,
  isNotEmptyArray,
} from "../shared/functions/validators";
import { postData } from "../shared/functions/postData";

const props = defineProps({
  initialData: Object,
  postUrl: String,
  allCategory: Array,
});
const { user } = useState();

const formValues = reactive({
  description: props.initialData?.description ?? "",
  preparationTime: props.initialData?.preparationTime ?? null,
  recipeName: props.initialData?.recipeName ?? "",
  preparation: props.initialData?.preparation ?? [],
  ingredients: props.initialData?.ingredients ?? [],
  category: props.initialData?.category ?? null,
  photo: props.initialData?.photo ?? null,
});

const updateValue = (fieldName, emitValue) => {
  formValues[fieldName] = emitValue;
};

const isPhotoValid = computed(() => {
  return formValues.photo != null;
});

// const isCategoryValid = computed(() => {
//   return allCategory.includes(formValues.category)
// });

const isPreparationTimeValid = computed(() => {
  return (
    formValues.preparationTime != undefined && formValues.preparationTime > 0
  );
});

const isNameValid = computed(() => {
  return isLengthValid(formValues.recipeName, 3).isValid;
});

const isDescriptionValid = computed(() => {
  return isLengthValid(formValues.description, 3).isValid;
});

const isIngredientsValid = computed(() => {
  return isNotEmptyArray(formValues.ingredients).isValid;
});

const isPreparationValid = computed(() => {
  return isNotEmptyArray(formValues.preparation).isValid;
});

const isFormValid = computed(() => {
  return (
    isPreparationTimeValid &&
    isNameValid.value &&
    isDescriptionValid.value &&
    isIngredientsValid.value &&
    isPreparationValid.value &&
    isPhotoValid.value
    //  && isCategoryValid.value
  );
});

const sendForm = () => {
  postData(formValues, { goTo: `/userRecipes/${user.value}` }, props.postUrl);
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const base64String = await compressAndConvertToBase64(file, 800, 600);
  console.log(base64String);
  formValues["photo"] = base64String;
};

const compressAndConvertToBase64 = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();

            reader.onloadend = () => {
              const base64String = reader.result.split(",")[1];
              resolve(base64String);
            };

            reader.onerror = () => {
              reject(new Error("Failed to convert image to base64"));
            };

            reader.readAsDataURL(blob);
          },
          file.type || "image/jpeg",
          0.5 // Adjust the compression quality if needed
        );
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Failed to compress image"));
    };

    reader.readAsDataURL(file);
  });
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

h2 {
  margin-bottom: 1rem;
}

h3 {
  margin-top: 1rem;
}

.warning {
  color: rgb(217, 27, 27);
  margin-top: 0.4rem;
  font-size: 13px;
}

@media (max-width: 768px) {
  .container {
    width: 20rem;
  }
}
</style>
