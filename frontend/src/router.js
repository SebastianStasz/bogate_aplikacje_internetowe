import { createRouter, createWebHistory } from "vue-router";
import { authenticationGuard } from "./shared/functions/authenticationGuard";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "HomePage",
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
      path: "/userRecipes/:userName",
      name: "userRecipes",
      component: () => import('./views/UserRecipesPage.vue'),
    },
    {
      path: "/addRecipe",
      component: () => import('./views/AddRecipePage.vue'),
      beforeEnter: authenticationGuard,
    },
    {
      path: "/editRecipe/:recipeId",
      name: "editRecipe",
      component: () => import('./views/EditRecipePage.vue'),
      beforeEnter: authenticationGuard,
    },
    {
      path: "/recipeDetails/:recipeId",
      name: "recipeDetails",
      component: () => import('./views/RecipeDetailsPage.vue'),
    },
  ],
});
