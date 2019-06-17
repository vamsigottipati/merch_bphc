import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import * as firebase from 'firebase'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: 'AIzaSyAAhptvyV0rFPzxEM-DQiA_wFGV9xLDAjs',
  authDomain: 'bits-merch.firebaseapp.com',
  databaseURL: 'https://bits-merch.firebaseio.com',
  projectId: 'bits-merch',
  storageBucket: 'bits-merch.appspot.com',
  messagingSenderId: '76207038080'
}

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
