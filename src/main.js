import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import { firestorePlugin } from 'vuefire'

export const db = firebase.initializeApp({ projectId: 'applicantswork-master' }).firestore()


Vue.config.productionTip = false

Vue.use(firestorePlugin)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
