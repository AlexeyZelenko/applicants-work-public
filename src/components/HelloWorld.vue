<template>
    <v-card>
        <v-card
                class="mx-auto"
                max-width="90%"
                style="margin-top: 10px">
            <v-toolbar
                    color="cyan"
                    dark
            >
                <v-toolbar-title>
                    <div>Ваши соискатели</div>
                    <div style="font-size: 0.8rem;">
                        <v-icon>mdi-account-multiple-check</v-icon>
                        Всего соискателей {{items.filter(item => {return item.active === true}).length}}
                    </div>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <div class="my-2" style="padding: 7px">
                    <v-btn @click="priority = !priority" small>
                        <v-icon>mdi-bookmark</v-icon>
                        Избранные
                    </v-btn>
                </div>
            </v-toolbar>

            <v-list three-line>
                <template v-for="(item, index) in ShowElect">

                    <v-subheader
                            :key="item.header"
                            v-if="item.header"
                            v-text="item.header"
                    ></v-subheader>

                    <v-divider
                            :inset="item.inset"
                            :key="index"
                            v-else-if="item.divider"
                    ></v-divider>

                    <v-list-item
                            :key="item.title"
                            @click="1"
                            v-else
                    >
                        <!--аватар-->
                        <v-list-item-avatar v-if="item.avatar.length === 0">
                            <v-icon>mdi-account-circle</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-avatar>
                            <v-img :src="item.avatar"></v-img>
                        </v-list-item-avatar>


                        <!--Избранные-->
                        <v-list-item-icon v-if="item.elect === true">
                            <v-icon color="pink">mdi-star</v-icon>
                        </v-list-item-icon>

                        <!--Ф.И.О + вакансия-->
                        <v-list-item-content @click="Editing(item)" style="cursor: pointer">
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle>
                                Вакансия: {{item.subtitle}}
                            </v-list-item-subtitle>
                        </v-list-item-content>


                        <!--Список телефонов-->
                        <template>
                            <v-list-item-content>
                                <v-list-item-title v-if="item.telephone.length != '0'">
                                    <v-icon color="indigo">mdi-phone</v-icon>
                                    {{item.telephone[0]}}
                                </v-list-item-title>

                                <v-list-item-subtitle v-if="item.telephone.length > 1">
                                    <div @click="showTelephone2(item)" style="cursor: pointer">
                                        <div v-if="item.showBlokTelephone">
                                            Показать еще {{item.telephone.length - 1}} номер
                                        </div>
                                        <v-list-item-title v-else-if="!item.showBlokTelephone">
                                            <v-icon color="indigo">mdi-phone</v-icon>
                                            {{show2}}
                                        </v-list-item-title>
                                    </div>
                                </v-list-item-subtitle>

                                <v-list-item-subtitle
                                        v-else-if="item.telephone.length == '0'">
                                    Телефон не указан
                                </v-list-item-subtitle>


                            </v-list-item-content>
                        </template>


                        <!--Список e-mail-->
                        <template>
                            <v-list-item-content>
                                <v-list-item-title v-if="item.email.length != '0'">
                                    <v-icon color="indigo">mdi-email</v-icon>
                                    {{item.email[0] | toUpperCase}}
                                </v-list-item-title>

                                <v-list-item-subtitle v-if="item.email.length > 1">
                                    <div @click="showEmail2(item)" style="cursor: pointer">
                                        <div v-if="item.showBlokEmail">
                                            Показать еще {{item.email.length - 1}} адресс(а)
                                        </div>
                                        <v-list-item-title v-else-if="!item.showBlokEmail">
                                            <v-icon color="indigo">mdi-email</v-icon>
                                            {{show3}}
                                        </v-list-item-title>
                                    </div>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle
                                        v-else-if="item.email.length == '0'">
                                    Адресс не указан
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </template>

                        <!--Рейтинг соискателя-->
                        <div class="text-center">
                            <v-rating
                                    background-color="indigo lighten-3"
                                    color="indigo"
                                    :dense='true'
                                    :half-increments='true'
                                    :hover='true'
                                    v-model="rating"
                            ></v-rating>
                            <span class="grey--text text--lighten-2 caption mr-2">
                                Средний балл: {{ item.rating }}
                            </span>
                        </div>

                        <!--Группа кнопок справа-->
                        <v-card
                                class="py-5"
                                flat
                        >
                            <v-btn-toggle
                                    mandatory
                                    v-model="toggle_exclusive"
                            >
                                <v-btn @click="deleteTodo(item)">
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                                <v-btn @click="Editing(item)">
                                    <v-icon>mdi-format-list-bulleted-triangle</v-icon>
                                </v-btn>
                                <v-btn>
                                    <v-icon @click="item.elect = !item.elect">mdi-bookmark</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </v-card>
                    </v-list-item>
                </template>
            </v-list>
        </v-card>
        <!--Навигация по страницам-->
        <div class="text-center">
            <v-pagination
                    :length="15"
                    :total-visible="7"
                    v-model="page"
            ></v-pagination>
        </div>
        <v-content>
            <CreateNewApplicant @create-new-applicant="CreateNewApplicant"/>
        </v-content>

        <!--Подробная карта соискателя-->
        <v-row justify="center">
            <v-dialog
                    class="mx-auto"
                    max-width="356"
                    tile
                    v-model="dialog"
            >
                <v-card>
                    <v-list>
                        <v-list-item>

                            <!--аватар-->
                            <v-list-item-avatar v-if="messageAvatar.length === 0">
                                <v-icon>mdi-account-circle</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-avatar>
                                <v-img :src="messageAvatar"></v-img>
                            </v-list-item-avatar>

                            <v-list>
                                <v-list-item-title>
                                    {{ messageTitle[0] }}
                                </v-list-item-title>
                                <v-list-item-title>
                                    {{ messageTitle[1] }}
                                </v-list-item-title>
                                <v-list-item-title>
                                    {{ messageTitle[2] }}
                                </v-list-item-title>
                            </v-list>

                            <v-spacer></v-spacer>

                            <v-list>
                                <v-list-item-icon v-if="messageElect">
                                    <v-icon color="pink">mdi-star</v-icon>
                                </v-list-item-icon>
                            </v-list>


                        </v-list-item>
                    </v-list>
                    <v-divider></v-divider>

                    <v-list three-line>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-phone</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>
                                    {{this.messageTelephone[0]}}
                                </v-list-item-title>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{this.messageTelephone[1]}}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item @click="1">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-email</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{this.messageEmail[0]}}</v-list-item-title>
                                <v-list-item-title>{{this.messageEmail[1]}}</v-list-item-title>

                            </v-list-item-content>
                        </v-list-item>
                        <v-divider inset></v-divider>

                        <v-list-item @click="1">
                            <v-list-item-icon>
                                <v-icon color="indigo">mdi-briefcase-account</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{skills()}}</v-list-item-title>
                                <v-list-item-subtitle>{{this.skillsText.join(', ')}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>


                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                                @click="dialog = false"
                                color="green darken-1"
                                text
                        >
                            Закрыть
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-card>

</template>

<script>
    import CreateNewApplicant from './CreateNewApplicant'
    import Swal from 'sweetalert2';


    export default {
        name: "HelloWorld",

        components: {
            CreateNewApplicant,
        },

        data: () => ({
            messageElect: '',
            skillsText: ['Навыки не указаны'],
            messageTelephone: [],
            messageEmail: [],
            messageTitle: ' ',
            user: [],
            page: 1,
            priority: false,
            isEditing: false,
            toggle_exclusive: undefined,
            dialog: false,
            result: '',
            messageAvatar: '',

            items: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    elect: false,
                    active: true,
                    title: 'Бинман Иван Натанович',
                    subtitle: 'Full-stak разработчик',
                    telephone: ['+7(900)800-70-60'],
                    email: [`ioan@binman.ru`, `hgh@hghsga.ru`,],
                    rating: 1,
                    showBlokTelephone: true,
                    skillsText: ['HTML'],
                    showBlokEmail: true,
                    id: 1,
                },
                {divider: true, inset: true},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    elect: false,
                    active: true,
                    title: 'Дурков Павел Владимирович',
                    subtitle: 'Full-stak разработчик',
                    telephone: [],
                    email: ['durkov@binman.ru',],
                    rating: 2,
                    showBlokTelephone: true,
                    skillsText: [`HTML`],
                    showBlokEmail: true,
                    id: 2,
                },
                {divider: true, inset: true},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    elect: false,
                    active: true,
                    title: 'Лебедина Алиса Александровна',
                    subtitle: "Web-дизайнер",
                    telephone: ['+7(800)802-70-60', '+7(800)802-70-61'],
                    email: ['design@binman.ru',],
                    rating: 3,
                    showBlokTelephone: true,
                    skillsText: ['Figma'],
                    showBlokEmail: true,
                    id: 3,

                },
                {divider: true, inset: true},
                {
                    avatar: '',
                    elect: true,
                    active: true,
                    title: 'Чулкова Оля',
                    subtitle: "Web-дизайнер",
                    telephone: [],
                    email: [],
                    rating: 4,
                    showBlokTelephone: true,
                    skillsText: ['Figma'],
                    showBlokEmail: true,
                    id: 4,
                },
                {divider: true, inset: true},
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    elect: false,
                    active: true,
                    title: 'Федора Линукс Линусовна',
                    subtitle: "Front-end зазработчик",
                    telephone: ['+7(900)800-70-89', '+7(900)900-70-56'],
                    email: ['ioan@binman.ru', 'luka@add.com'],
                    rating: 5,
                    showBlokTelephone: true,
                    skillsText: ['JS', 'HTML', 'Vue'],
                    showBlokEmail: true,
                    id: 5,
                },
            ],
        }),
        filters: {
            toUpperCase(value) {
              return value.toUpperCase()
          }
        },
        computed: {
            rating() {
                return 0
            },
            ShowElect() {
                let priority = this.priority;
                return this.items.filter(function (item) {
                    if (priority) return item.elect === true;
                    else return item.elect === false || item.elect === true;
                })
            },

        },
        methods: {

            skills() {
                const result = this.skillsText.join()
                return result

            },
            showEmail2(item) {
                const itemIndex = this.items.indexOf(item)
                this.show3 = this.items[itemIndex].email[1]
                this.items[itemIndex].showBlokEmail = !(this.items[itemIndex].showBlokEmail)
            },
            showTelephone2(item) {
                const itemIndex = this.items.indexOf(item)
                this.show2 = this.items[itemIndex].telephone[1]
                this.items[itemIndex].showBlokTelephone = !(this.items[itemIndex].showBlokTelephone)
            },
            Editing(item) {
                const itemIndex = this.items.indexOf(item);
                this.dialog = true;
                this.user = this.items[itemIndex]
                this.messageTitle = this.user.title.split(' ')
                this.messageTelephone = this.user.telephone
                this.messageEmail = this.user.email
                this.skillsText = this.user.skillsText
                this.messageAvatar = this.user.avatar
                this.messageElect = this.user.elect
            },
            CreateNewApplicant(newItem) {
                this.items.push(newItem);
            },

            deleteTodo(item) {
                Swal.fire({
                    title: 'Вы уверенны?',
                    text: "Вы не сможете вернуть это!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Да, удалить это!'
                }).then((result) => {
                    const itemIndex = this.items.indexOf(item);
                    this.items.splice(itemIndex, 1);
                    this.items.splice(itemIndex, 1);
                    if (result.value) {
                        Swal.fire(
                            'Удаленно!',
                            'Ваш файл был удален.',
                            'success'
                        );
                    }
                });
            },
        }
    }

</script>

<style scope>

</style>
