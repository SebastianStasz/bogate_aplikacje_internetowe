<template>
  <div class="container">
    <div class="recipe-content">
      <div class="recipe-content-general">
        <div class="picture">
          <img :src="decodedImage" />
        </div>
        <div class="recipe-info">
          <h2>{{ data.recipeName }}</h2>
          <div class="general-info">
            <div
              class="details"
              @click="
                router.push({
                  name: 'userRecipes',
                  params: { userName: data.userName },
                })
              "
            >
              <h4>Autor</h4>
              <p>{{ data.userName }}</p>
            </div>
            <div class="details">
              <h4>Kategoria</h4>
              <p>{{ data.category }}</p>
            </div>
            <div class="details">
              <h4>Czas przygotowania</h4>
              <p>{{ data.preparationTime }}</p>
            </div>
          </div>
          <div :class="{ 'ratings-centered' : !user, 'ratings' : user}">
            <div class="rating">
              <h4>Ocena ogólna</h4>
              <span
                ><v-rating
                  size="22"
                  v-model="data.rating"
                  class="ma-0.5"
                  density="compact"
                  readonly
                ></v-rating
              ></span>
            </div>
            <div class="rating" v-if="user">
              <h4>Moja ocena</h4>
              <span
                ><v-rating
                  size="22"
                  v-model="data.myRating"
                  class="ma-0.5 js"
                  density="compact"
                  @input="changeRating"
                ></v-rating
              ></span>
            </div>
          </div>
          <div class="buttons">
            <button
              v-if="user === data.userName"
              class="btn edit-btn"
              @click="
                router.push({
                  name: 'editRecipe',
                  params: { recipeId: data.id },
                })
              "
            >
              Edytuj przepis
            </button>
            <button
              v-if="user === data.userName"
              class="btn delete-btn"
              @click="deleteRecipe"
            >
              Usuń przepis
            </button>
          </div>
        </div>
      </div>
      <div class="recipe-content-details">
        <h3>Opis</h3>
        <p>{{ data.description }}</p>
        <h3>Lista skladników</h3>
        <li v-for="ingredient in data.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
        <h3>Przygotowanie</h3>
        <ol>
          <li v-for="step in data.preparation" :key="step">{{ step }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { reactive } from "@vue/reactivity";
import useState from "../shared/store/useState";
import router from "../router";
import { postData } from "../shared/functions/postData";

const { user } = useState();
const props = defineProps({
  detailsData: Object,
});

const data = reactive({
  id: props.detailsData?.id ?? null,
  userName: props.detailsData?.userName ?? "Nieznany autor",
  recipeName: props.detailsData?.recipeName ?? "Brak nazwy przepisu",
  preparationTime: props.detailsData?.preparationTime ?? "Nieznany",
  category: props.detailsData?.category ?? "Brak kategori",
  description: props.detailsData?.description ?? "Brak opisu przepisu",
  ingredients: props.detailsData?.ingredients ?? ["Brak składników"],
  preparation: props.detailsData?.preparation ?? ["Brak przygotowania"],
  rating: props.detailsData?.rating ?? null,
  myRating: props.detailsData?.myRating ?? null,
  photo: props.initialData?.photo ?? null,
});

const deleteRecipe = () => {
  postData(
    {},
    { goTo: `/userRecipes/${data.userName}` },
    "deleteRecipe",
    data.id
  );
};

const changeRating = () => {
  postData({ myRating: data.myRating }, {}, "changeRating", data.id);
};

const decodedImage = ref("");

const decodeImage = () => {
  const img = new Image();
  img.onload = () => {
    decodedImage.value = img.src;
  };
  img.src = `data:image/png;base64, ${props.detailsData.photo}`;
};

onMounted(() => decodeImage());
watchEffect(() => decodeImage());
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-content {
  max-width: 55rem;
  display: flex;
  flex-direction: column;
  border: 3px solid rgb(252, 72, 1);
  border-radius: 13px;
  background-color: #f2f2f2;
}

.recipe-content-general {
  display: flex;
  flex-direction: row;
  padding: 3rem;
}

.recipe-info {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
}

.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
  padding: 0.3rem;
  background-color: rgb(227, 224, 224);
  border: 2px solid rgb(252, 72, 1);
  border-radius: 13px;
  text-align: center;
}

.details:first-child:hover{
  background-color: rgb(223, 181, 181);
  cursor: pointer;
}
.general-info {
  margin-top: 1.2rem;
  display: flex;
  flex-direction: row;
}

.picture {
  align-self: center;
}

img {
  border: 2px solid rgb(252, 72, 1);
  border-radius: 13px;
  display: block;
  border-top-left-radius: 4%;
  border-top-right-radius: 4%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h2,
h4,
p {
  color: black;
}

h2 {
  margin-top: -1.5rem;
  margin-left: 1rem;
  font-size: 30px;
}

h4 {
  font-size: 10px;
}

.details p {
  font-size: 10px;
}

.ratings {
  width: 100%;
  margin-top: 3.8rem;
  display: flex;
  flex-direction: row;
}

.ratings-centered{
  margin-top: 3.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.6rem;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgb(252, 72, 1);
  border-radius: 13px;
  background-color: rgb(227, 224, 224);
}

.rating:first-child {
  margin-right: auto;
  margin-left: 1rem;
}

.ratings span, .ratings-centered span {
  color: #eea10c;
}

.ratings h4, .ratings-centered h4 {
  margin-top: 0.4rem;
}

.buttons {
  width: 100%;
  display: flex;
  margin-top: 3rem;
}

.btn {
  align-self: stretch;
  margin-top: 1rem;
  background-color: #f2580a;
  color: white;
  padding: 9px 16px;
  border: none;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  margin-left: 1rem;
}
.delete-btn {
  background-color: #ff4a2226;
  color: #ff4a22;
  margin-left: auto;
}

.edit-btn:hover {
  background-color: #2e8b57;
}

.delete-btn:hover {
  background-color: red;
  color: black;
}

.recipe-content-details {
  margin-left: 1.4rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  color: black;
}

.recipe-content-details ol li {
  margin-left: 1rem;
  margin-top: 10px;
}

@media (max-width: 960px) {
  .recipe-content-general {
    flex-direction: column;
  }

  .recipe-content {
    max-width: 28rem;
  }

  h2 {
    margin: 0;
    margin-top: 1.2rem;
  }

  .recipe-info {
    margin: 0;
  }
  .details:first-child {
    margin-left: 0;
  }

  .edit-btn {
    margin-left: 0;
  }
  .ratings{
    max-width: 250px;
    margin-top: 2rem;
  }
  .rating:first-child {
    margin-left: 0;
  }
  .buttons{
    margin-top: 1rem;
  }
  .recipe-content-details{
    margin-top: -3rem;
  }

}

h3 {
  margin-top: 1rem;
}
</style>
