<template>
    <v-row justify="center">
        <v-dialog max-width="600px" persistent v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn id="btnAktivator"
                       v-on="on">
                    <v-icon style="margin-right: 80%">
                        mdi-account-plus-outline
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Добавление соискателя</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Ф.И.О*" required v-model="titleText"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field label="Email*" required v-model="emailText"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email-2" required v-model="emailText2"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field label="Телефон*" required
                                              v-model="telephoneText"></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field label="Телефон2" required
                                              v-model="telephoneText2"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-select
                                        :items="['Full-stak разработчик', 'Web-дизайнер', 'Front-end разработчик']"
                                        label="Вакансия*"
                                        required
                                        v-model="vacancyText"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-autocomplete
                                        :items="['HTML', 'CSS', 'JS', 'Vue', 'Figma']"
                                        label="Навыки"
                                        multiple
                                        v-model="skillsText"
                                ></v-autocomplete>
                            </v-col>

                            <v-col>
                                <b-form-file
                                        drop-placeholder="Перетащите файл сюда..."
                                        placeholder="Выберите фотографию или перетащите сюда..."
                                        v-model="avatar"
                                ></b-form-file>
                            </v-col>

                        </v-row>
                    </v-container>
                    <small>*поля обязательные для заполнения</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false" color="blue darken-1" text>Закрыть</v-btn>
                    <v-btn @click="sendForm()" color="blue darken-1" text>Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>

</template>

<script>
  import Swal from 'sweetalert2';

  export default {
    name: "CreateNewApplicant",

    data: () => ({
      titleText: '',
      telephoneText: '',
      telephoneText2: '',
      emailText: '',
      emailText2: '',
      avatar: '',
      file: null,
      elect: false,
      active: true,
      toggle_exclusive: undefined,
      dialog: false,
      skillsText: [],
      vacancyText: '',
      id: Date.now(),

    }),

    methods: {
      sendForm() {
        if (this.titleText.length === 0 || this.telephoneText.length === 0 || this.emailText.length === 0) {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: `Соискатель не добавлен!!! Все поля должны быть заполнены!!!`,
            showConfirmButton: false,
            showCancelButton: true,
          });
        }
        if (this.titleText.length > 0 && this.telephoneText.length && this.emailText.length > 0) {
          const title = this.titleText;
          const telephone = [this.telephoneText, this.telephoneText2];
          const email = [this.emailText, this.emailText2];
          const avatar = this.avatar;
          const elect = this.elect;
          const subtitle = this.vacancyText;
          const skillsText = [this.skillsText[0], this.skillsText[1], this.skillsText[2],
            this.skillsText[3], this.skillsText[4], this.skillsText[5]];
          this.$emit('create-new-applicant', {
            title,
            telephone,
            email,
            elect,
            subtitle,
            rating: 1,
            avatar,
            active: true,
            skillsText,
            id: Date.now(),
          });
          this.titleText = '';
          this.telephoneText = '';
          this.telephoneText2 = '';
            this.emailText = '';
          this.emailText2 = '';
          this.avatar = '';
          this.vacancyText = '';
            this.elect = '';
            this.skillsText = '';

            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Соискатель добавлен!',
              showConfirmButton: false,
              timer: 1500
            });

        }
        this.dialog = false
      },
    }
  }

</script>

<style scoped>
    #btnAktivator {
        color: oldlace;
        background-color: lightsteelblue;
        display: block;
        width: 150px;
        height: 250px;
        position: fixed;
        right: -100px;
        top: 200px;
        z-index: 99999;
        border-radius: 50%;
    }

</style>
