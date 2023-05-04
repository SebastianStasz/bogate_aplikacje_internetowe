<template>
  <v-app-bar>
    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        {{ appTitle }}</router-link
      >
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <span class="d-none d-md-flex">
        <v-btn
          flat
          v-for="item in user ? menuItemsLoggedIn : menuItemsLoggedOut"
          :key="item.title"
          :to="item.path"
          @click="item?.onClick"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </span>
      <v-app-bar-nav-icon
        class="d-flex d-md-none"
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-toolbar-items>
  </v-app-bar>

  <v-navigation-drawer
    class="d-flex d-md-none navigation text-center"
    v-model="drawer"
    location="bottom"
    temporary
  >
    <li
      class="navigation-list"
      v-for="item in user ? menuItemsLoggedIn : menuItemsLoggedOut"
    >
      <v-btn
        class="mt-4 w-50"
        flat
        :key="item.title"
        :to="item.path"
        @click="item?.onClick"
      >
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </li>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import useState from "../shared/store/useState";
import logOutUser from "../shared/functions/auth/logOutUser";

const { user } = useState();
const appTitle = "Świat przepisów";
const drawer = ref(false);
const menuItemsLoggedIn = computed(() => {
  return [
    { title: "Strona główna", path: "/", icon: "mdi-home" },
    {
      title: "Moje przepisy",
      path: "/userRecipes/" + user.value,
      icon: "mdi-home",
    },
    { title: "Dodaj przepis", path: "/addRecipe", icon: "mdi-note-plus" },
    { title: "Wyloguj", path: "/", icon: "mdi-account", onClick: logOutUser },
  ];
});
const menuItemsLoggedOut = [
  { title: "Strona główna", path: "/", icon: "mdi-home" },
  { title: "Zaloguj", path: "/logIn", icon: "mdi-account" },
  { title: "Zarejestruj", path: "/signUp", icon: "mdi-account-plus" },
];
</script>

<style>
header {
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: #242424;
  color: #ff4a22;
}
</style>
