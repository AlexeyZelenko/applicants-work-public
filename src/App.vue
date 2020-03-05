<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <div class="d-flex align-center">
                <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                        transition="scale-transition"
                        width="40"
                />
                <v-img
                        alt="Vuetify Name"
                        class="shrink mt-1 hidden-sm-and-down"
                        contain
                        min-width="100"
                        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                        width="100"
                />
                <div>
                    <!-- используем компонент router-link для навигации -->
                    <!-- входной параметр `to` определяет URL для перехода -->
                    <!-- `<router-link>` по умолчанию отображается тегом `<a>` -->
                    <router-link class="hrefPage" style="color: aqua" to="home">Главная</router-link>
                    <router-link class="hrefPage" style="color: aqua" to="/interviews">Календарь собеседований
                    </router-link>
                    <router-link class="hrefPage" style="color: aqua" to="/about">О нас</router-link>
                </div>
            </div>
        </v-app-bar>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>


  export default {
    name: 'App'
  }
</script>
<style scoped>
    .hrefPage {
        color: aqua;
        margin: auto 20px
    }
</style>
