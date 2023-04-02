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
      component: () => import('./views/LogInPage.vue'),
    },
    {
      path: "/signUp",
      component: () => import('./views/SignUpPage.vue'),
    },
    {
      path: "/myRecipes",
      component: () => import('./views/MyRecipesPage.vue'),
    },
  ],
});
