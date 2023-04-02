<template>
    <v-app-bar>
        <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer"> {{ appTitle }}</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <span class="d-none d-md-flex">
                <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                    <v-icon left dark>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </span>
            <v-app-bar-nav-icon class="d-flex d-md-none" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer class="d-flex d-md-none" v-model="drawer" location="bottom" temporary>
        <li class="navigation-list" v-for="item in menuItems">
            <v-btn class="mt-4 w-50" flat :key="item.title" :to="item.path">
                <v-icon left dark>{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>
        </li>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            appTitle: 'Świat przepisów',
            drawer: true,
            menuItems: [
                { title: 'Strona główna', path: '/', icon: 'mdi-home' },
                { title: 'Zaloguj', path: '/logIn', icon: 'mdi-account' },
                { title: 'Zarejestruj', path: '/signUp', icon: 'mdi-account-plus' }
                // { title: 'Moje przepisy', path: '/myrecipes', icon: 'mdi-cog' },
            ]
        }
    },
};
</script>
