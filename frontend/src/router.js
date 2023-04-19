import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import('./views/Home.vue'),
    },
    {
      path: "/logIn",
      component: () => import('./views/LoginPage.vue'),
    },
    {
      path: "/register",
      component: () => import('./views/RegistrationPage.vue'),
    },
    {
      path: "/myRecipes",
      component: () => import('./views/MyRecipesPage.vue'),
    },
  ],
});
