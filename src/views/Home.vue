<template>
  <div class="home">
      <img src="../assets/1.png" style="height: 80px; width: auto;position: absolute; top: 30px; left: 30px; " alt="">
      <img src="../assets/1.gif" v-if="this.loading" style="position: absolute; bottom: 25%; right: 30%;height: 50%;border-radius: 10px; width: auto;cursor: pointer;z-index: 999;" alt="">
    <div v-if="!this.loading" class="cont">
        <!-- <h2>Login With Your Credentials</h2> -->
        <p class="placeholder_text">Registered Email:</p>
        <input type="email" class="email" v-model="email" ref="email">
        <p class="placeholder_text">Password:</p>
        <input type="password" ref="password" class="password" v-model="password">
        <div style="text-align: left;">
          <button @click="this.login" class="btn-submit"> Login </button>
        </div>
    </div>
  </div>
</template>

<style scoped>
  .home{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .cont{
    width: 25vw;
    height: 100vh;
    margin-left:37.5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  input{
    all: unset;
    background: #ffffff;
    border: 2px solid #bbbbbb;
    color: #2c3e50;
    padding: 10px;
    margin: 5px;
    width: 25vw;
    border-radius: 10px; 
    font-size: 20px;
    align-self: flex-start;
    text-align: left;
  }
  .btn-submit{
    all: unset;
    width: auto;
    padding: 15px 60px 15px 60px;
    background: #f06c6c;
    color: #ffffff;
    font-weight: 900;
    font-size: 20px;
    margin-top: 50px;
    margin-left: 10px;
    border-radius: 1000px;
    cursor: pointer;
  }
  .placeholder_text {
    align-self: flex-start;
    font-size: 20px;
    font-weight: 600;
    transform: translateX(5px);
  }
</style>


<script>

import * as firebase from 'firebase'

export default {
  name: 'home',
  components: {},
  data () {
    return {
      password: '',
      email: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      if (this.email && this.password) {
        var vm = this
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          resp => {
            console.log(resp)
            vm.$router.push('/order')
            var d = new Date
            var t = d.getTime()
            var temp = vm.email
            var e = temp.slice(0, temp.indexOf("@"))
            firebase.database().ref('log/' + e).push({
              'loggedInAt': t
            })
            this.loading = false
          }
        )
      } else {
        alert('Enter The Login Credentials')
        this.loading = false
      }
    }
  }
}
</script>
