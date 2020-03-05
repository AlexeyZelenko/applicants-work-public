<template>
    <v-row>
        <v-col cols="12" offset-sm="3" sm="6">
            <v-card>
                <v-container fluid>
                    <v-row>
                        <v-col
                                :key="n"
                                class="d-flex child-flex"
                                cols="4"
                                v-for="n in 9"
                        >
                            <v-card class="d-flex" flat tile>
                                <v-img
                                        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                        aspect-ratio="1"
                                        class="grey lighten-2"
                                >
                                    <template v-slot:placeholder>
                                        <v-row
                                                align="center"
                                                class="fill-height ma-0"
                                                justify="center"
                                        >
                                            <v-progress-circular color="grey lighten-5"
                                                                 indeterminate></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>

</style>
