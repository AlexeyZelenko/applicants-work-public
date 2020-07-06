<template>
    <div>
        <form @submit="addLocation(title, email, telephone, avatar, skillsText, subtitle, rating )">
<!--            <input v-model="title" placeholder="person Name">-->
<!--            <input v-model="subtitle" placeholder="person subtitle">-->
            <v-text-field v-model="title" placeholder="person Name" label="Main input" :rules="rules" hide-details="auto"></v-text-field>
            <v-text-field v-model="subtitle" placeholder="person subtitle" label="Another input"></v-text-field>
<!--            <input v-model="email" placeholder="person email">-->
            <input v-model="telephone" placeholder="person telephone">

<!--            <input v-model="avatar" placeholder="person avatar">-->
            <v-file-input v-model="avatar" placeholder="person avatar" accept="image/*" label="File input"></v-file-input>

            <input v-model="skillsText" placeholder="person skillsText">
            <input v-model="rating" placeholder="person rating">
            <v-text-field :rules="rules2" v-model="email" placeholder="person email"></v-text-field>

            <v-file-input multiple v-model="avatar" label="File input"></v-file-input>

            <button type="submit">Add New Location</button>

        </form>
        <v-file-input v-model="avatar" placeholder="person avatar" accept="image/*" label="File input"></v-file-input>
    </div>
</template>

<script>
    import {db} from "../main"
    export default {
      name: 'AddPerson',
      data: () => ({
        rules: [
          value => !!value || 'Required.',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
        rules2: [
          value => !!value || 'Required.',
          value => (value || '').length <= 20 || 'Max 20 characters',
          value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        ],
         people: [],
         title: '',
         email: '',
        avatar: '',
        rating: '',
        skillsText: '',
        subtitle: '',
        telephone: ''}),
        firestore() {
          return {
            locations: db.collection('people').orderBy('createdAt')
          }
        },
        methods: {
          addLocation(subtitle, skillsText, avatar, title, email, telephone, rating) {
            const createdAt = new Date()
            const elect = false
            const active = true
            const id = new Date()
            const showBlokTelephone = true

            db.collection('people').add({showBlokTelephone, subtitle, skillsText, rating, avatar, id, active, telephone, elect, title, email, createdAt})
          },
          deleteLocation(id) {
            db.collection('people').doc(id).delete()
          }
        }
      }
</script>
