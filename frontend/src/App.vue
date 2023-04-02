<template>
  <v-app>
    <navigation></navigation>

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import navigation from './components/navigation.vue'

export default {
  name: 'app',
  components: {
    'navigation': navigation,
  }
}
</script>

<style scoped></style>
