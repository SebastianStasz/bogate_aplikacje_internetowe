<template>
  <div class="card">
    <img src="https://picsum.photos/390/242?random=1" />
    <div class="recipe-content">
      <div>
        <h4>{{ props.title }}</h4>
        <p>{{ props.description }}</p>
      </div>
      <div class="card-footer">
        <span
          ><v-rating
            v-model="props.rating"
            class="ma-2"
            density="compact"
          ></v-rating
        ></span>
        <MainButton
          title="Zobacz opis"
          @click="
            router.push({
              name: 'recipeDetails',
              params: { recipeId: props.recipeId },
            })
          "
        ></MainButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainButton from "./MainButton.vue";
import router from "../router";
const props = defineProps({
  recipeId: Number,
  title: String,
  description: String,
  rating: Number,
});
</script>

<style scoped>
.card {
  width: 390px;
  height: 475px;
  border-radius: 20;
}

.recipe-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
  gap: 12px;
  background: #ffffff;
  box-shadow: 0px 5px 10px rgba(224, 224, 236, 0.3);
  border-radius: 0px 0px 10px 10px;
  height: 240px;
  overflow: hidden;
}

p {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

h4 {
  font-size: 18px;
  line-height: 27px;
  color: black;
}

p {
  font-size: 16px;
  line-height: 24px;
  color: #6b6262;
}

span {
  color: #eea10c;
}

img {
  display: block;
  border-top-left-radius: 4%;
  border-top-right-radius: 4%;
}
</style>
