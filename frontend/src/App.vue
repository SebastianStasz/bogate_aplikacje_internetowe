<template>
  <v-app>
    <navigation-bar></navigation-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: 'app',
  components: {
    'navigation-bar': NavigationBar,
  }
}
</script>

<style scoped></style>
