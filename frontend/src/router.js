import { createRouter, createWebHistory } from "vue-router";
import { authenticationGuard } from "./shared/functions/authenticationGuard";

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
      path: "/signUp",
      component: () => import('./views/SignUpPage.vue'),
    },
    {
      path: "/myRecipes",
      component: () => import('./views/MyRecipesPage.vue'),
      beforeEnter: authenticationGuard,
    },
  ],
});
