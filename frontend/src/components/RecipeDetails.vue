<template>
  <div class="container">
    <div class="recipe-content">
      <div class="recipe-content-general">
        <div class="picture">
          <img src="https://picsum.photos/390/242?random=1" />
        </div>
        <div class="recipe-info">
          <h2>{{ data.title }}</h2>
          <div class="general-info">
            <div class="details">
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
            <div class="details">
              <h4>Nazwa</h4>
              <p>{{ data.recipeName }}</p>
            </div>
          </div>
          <div class="ratings">
            <div class="rating">
              <h4>Ocena ogólna</h4>
              <span
                ><v-rating
                  v-model="data.rating"
                  class="ma-0.5"
                  density="compact"
                ></v-rating
              ></span>
            </div>
            <div class="rating">
              <h4>Moja ocena</h4>
              <span
                ><v-rating
                  v-model="data.myRating"
                  class="ma-0.5"
                  density="compact"
                ></v-rating
              ></span>
            </div>
          </div>
          <div class="buttons">
            <button v-if="user" class="btn edit-btn">Edytuj przepis</button>
            <button v-if="user" class="btn delete-btn">Usuń przepis</button>
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
import { reactive } from "@vue/reactivity";
import useState from "../shared/store/useState";
const { user } = useState();
const data = reactive({
  userName: "Jan Nowak",
  title: "Tiramisu Cake",
  recipeName: "Tiramisu",
  preparationTime: "60 min",
  category: "Ciasta",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id.",
  recipeName: "Tiramisu",
  ingredients: ["Ogórek", "Kurczak", "Kot", "Ser"],
  preparation: ["Pokrój ogórek", "Umyj kurczak", "Podsmaż kot", "Zjedz ser"],
  rating: 2,
  myRating: 3,
});
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
  display: solid;
  border: 2px solid rgb(252, 72, 1);
  border-radius: 13px;
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
  margin-top: 1.8rem;
  display: flex;
  flex-direction: row;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border: 2px solid rgb(252, 72, 1);
  border-radius: 13px;
  background-color: rgb(227, 224, 224);
}

.rating:first-child {
  margin-right: auto;
  margin-left: 1rem;
}

.ratings span {
  color: #eea10c;
}

.ratings h4 {
  margin-top: 0.4rem;
}

.buttons {
  width: 100%;
  display: flex;
  margin-top: 1rem;
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
  .rating:first-child {
    margin-left: 0;
  }
}
</style>