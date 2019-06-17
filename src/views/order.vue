<template>
  <div>
      <img src="../assets/1.png" style="height: 80px; width: auto;position: absolute; top: 30px; left: 30px; " alt="">
      <img src = '../logout.svg' style="position: absolute; bottom: 50px; right: 50px;height: 30px;border-radius: 10px; width: 20px;cursor: pointer;" @click="logout"/>
      <img src="../assets/1.gif" v-if="this.loading" style="position: absolute; bottom: 25%; right: 30%;height: 50%;border-radius: 10px; width: auto;cursor: pointer;z-index: 999;" alt="">
      <div v-if="!this.showTable && !this.loading" ref="order_ref" class="order">
        <p class="placeholder_text">ID Number:</p>
        <input class="form_field" type="text" name="Id_Num" id="idNum" v-model="idNum">
        <p class="placeholder_text">One Time Password:</p>
        <input class="form_field" type="text" name="OTP" id="OTP" v-model="otp">
        <div>
          <button class="btn-submit" @click="check_otp"> Check </button>
        </div>
      </div>
      <div v-if="this.showTable && !this.loading" ref="main_ref" class="main_ref">
        
        <h1>Order</h1>
        <div class="content_table">
          <div class="content_table_header">
            <p>Merch</p>
            <p>Size</p>
            <p>Quantity</p>
          </div>
          <div class="content_table_main_cont" v-for="(l, index) in this.content" :key="`${index}`"  style="display: flex; flex-direction: column;">
            <div v-if="l.s != '0' || 0" class="content_table_main">
              <p v-if="l.mname == 'red+polo'">blue+polo</p>
              <p v-if="l.mname == 'blue+polo'">red+polo</p>
              <p v-if="l.mname != 'blue+polo' && l.mname != 'red+polo'">{{l.mname}}</p>
              <p>s</p>
              <p>{{l.s}}</p>
            </div>
            <div v-if="l.xs != '0' || 0" class="content_table_main">
              <p v-if="l.mname == 'red+polo'">blue+polo</p>
              <p v-if="l.mname == 'blue+polo'">red+polo</p>
              <p v-if="l.mname != 'blue+polo' && l.mname != 'red+polo'">{{l.mname}}</p>
              <p>xs</p>
              <p>{{l.xs}}</p>
            </div>
            <div v-if="l.m != '0' || 0" class="content_table_main">
              <p v-if="l.mname == 'red+polo'">blue+polo</p>
              <p v-if="l.mname == 'blue+polo'">red+polo</p>
              <p v-if="l.mname != 'blue+polo' && l.mname != 'red+polo'">{{l.mname}}</p>
              <p>m</p>
              <p>{{l.m}}</p>
            </div>
            <div v-if="l.l != '0' || 0" class="content_table_main">
              <p v-if="l.mname == 'red+polo'">blue+polo</p>
              <p v-if="l.mname == 'blue+polo'">red+polo</p>
              <p v-if="l.mname != 'blue+polo' && l.mname != 'red+polo'">{{l.mname}}</p>
              <p>l</p>
              <p>{{l.l}}</p>
            </div>
            <div v-if="l.xl != '0' || 0" class="content_table_main">
              <p v-if="l.mname == 'red+polo'">blue+polo</p>
              <p v-if="l.mname == 'blue+polo'">red+polo</p>
              <p v-if="l.mname != 'blue+polo' && l.mname != 'red+polo'">{{l.mname}}</p>
              <p>xl</p>
              <p>{{l.xl}}</p>
            </div>
            <div v-if="l.xxl != '0' || 0" class="content_table_main">
              <p v-if="l.mname == 'red+polo'">blue+polo</p>
              <p v-if="l.mname == 'blue+polo'">red+polo</p>
              <p v-if="l.mname != 'blue+polo' && l.mname != 'red+polo'">{{l.mname}}</p>
              <p>xxl</p>
              <p>{{l.xxl}}</p>
            </div>
            <div v-if="l.xxxl != '0' || 0" class="content_table_main">
              <p v-if="l.mname == 'red+polo'">blue+polo</p>
              <p v-if="l.mname == 'blue+polo'">red+polo</p>
              <p v-if="l.mname != 'blue+polo' && l.mname != 'red+polo'">{{l.mname}}</p>
              <p>xxxl</p>
              <p>{{l.xxxl}}</p>
            </div>
          </div>
        </div>
        <button class="btn-submit" @click="clearEntry">Deliver</button>
      </div>
  </div>
</template>

<script>

import * as firebase from 'firebase'

export default {
  name: 'Order',
  data () {
    return {
      idNum: '',
      otp: '',
      content: [],
      showTable: false,
      loading: false
    }
  },
  methods: {
    check_otp () {
      this.loading = true
      var vm = this
      var fbdb = firebase.database()
      if(this.idNum && this.otp) {
        fbdb = fbdb.ref(this.idNum).once('value').then(
          resp => {
            if(resp.val().OTP != '' || undefined ) {
              if(resp.val().delivered) {
                alert('Sorry, Merch Already Taken')
              } else{
                if(vm.otp == resp.val().OTP) {
                  var a = resp.val().orders
                  var b = Object.values(a)
                  var c = Object.keys(a)
                  vm.content = b
                  this.showTable = true
                  this.loading = false
                } else{
                  alert('wrong OTP')
                  this.loading = false
                }
              }
            } else {
              alert('No Record Found')
            }
          }
        ).catch(
          err => {
            alert(err)
          }
        )
      }
    },
    clearEntry () {
      firebase.database().ref(this.idNum + '/OTP').remove()
      var d = new Date
      var t = d.getTime()
      firebase.database().ref(this.idNum + '/delivered').set(true).then(
        resp => {
          firebase.database().ref(this.idNum + '/deliveredAt').set(t).then(
            resp2 => {
              window.location.reload()
            }
          )
        }
      )
    },
    logout () {
      var vm = this
      firebase.auth().signOut().then(
        resp => {
          vm.$router.push('/')
        }
      )
    }
  }
}
</script>

<style scoped>
    .order {
      height: 100vh;
      text-align: left;
      width: 25vw;
      margin-left: 37.5vw;
      display: flex;
      flex-direction: column;
      align-content: center;
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
  }
  .placeholder_text{
    align-self: flex-start;
    font-size: 20px;
    font-weight: 600;
    transform: translateX(5px);
  }
  .btn-submit {
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
  .main_ref {
    display: block;
    margin-top: 120px;
  }
  .content_table {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
  }
  .content_table_header {
    display: flex;
    flex-direction: row;
    align-self: center;
  }
  .content_table_header > p{
    font-size: 22px;
    width: 300px;
    font-weight: 900;
    text-align: left;
  }
  .content_table_main {
    display: flex;
    flex-direction: row;
  }
  .content_table_main_cont {
    align-self: center;
  }
  .content_table_main > p{
    width: 300px;
    font-size: 20px;
    text-align: left !important;
    text-align: center;
    font-weight: 400;
  }
</style>


