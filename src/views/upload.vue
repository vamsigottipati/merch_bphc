<template>
    <div>
        <img src="../assets/1.png" style="height: 80px; width: auto;position: absolute; top: 30px; left: 30px; " alt="">
        <img src = '../logout.svg' style="position: absolute; bottom: 50px; right: 50px;height: 30px;border-radius: 10px; width: 20px;cursor: pointer;" @click="logout"/>
        <div style="margin-top: 40vh;height: auto;text-align: center;">
            <label class="file">
                <input type="file" ref="file_ip" id="file" aria-label="File browser example" @change="loadTextFromFile" @load="text = $event">
                <span style="width: 20vw;height: 30px;" class="file-custom">{{this.filename}}</span>
            </label>
        </div>
    </div>
</template>

<script>

import * as firebase from 'firebase'

export default {
    name: 'Upload',
    data () {
        return {
            filename: 'Choose A File',
            text: ''
        }
    },
    mounted: function () {
    },
    methods: {
        logout () {
            var vm = this
            firebase.auth().signOut().then(
                resp => {
                vm.$router.push('/')
                }
            )
        },
        loadTextFromFile(ev) {
            var vm = this
            const file = ev.target.files[0];
            const reader = new FileReader();

            reader.onload = e => {
                vm.text = e.target.result
                // send data to firebase
            };
            reader.readAsText(file);
            }
    }
}
</script>

<style scoped>
    .file {
        position: relative;
        display: inline-block;
        cursor: pointer;
      }
      .file input {
        min-width: 14rem;
        margin: 0;
        filter: alpha(opacity=0);
        opacity: 0;
      }
      .file-custom {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 5;
        padding: .5rem 1rem;
        color: #555;
        background-color: #fff;
        border: .075rem solid #ddd;
        border-radius: .25rem;
        box-shadow: inset 0 .2rem .4rem rgba(0,0,0,.05);
        -webkit-user-select: none;
          -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
      }
      .file-custom:before {
        position: absolute;
        top: -.075rem;
        right: -.075rem;
        bottom: -.075rem;
        z-index: 6;
        display: block;
        content: "Browse";
        height: 30px;
        padding: .5rem 1rem;
        line-height: 1.5;
        color: #555;
        background-color: #eee;
        border: .075rem solid #ddd;
        border-radius: 0 .25rem .25rem 0;
      }

      /* Focus */
      .file input:focus ~ .file-custom {
        box-shadow: 0 0 0 .075rem #fff, 0 0 0 .2rem #0074d9;
      }
</style>
