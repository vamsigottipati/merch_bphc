import * as firebase from 'firebase'

export default (to, from, next) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user.uid != 'G7bVydbYsrgY1jagahlyr4SSqPl2') {
      next({
        path: ''
      })
    } else {
      next()
    }
  })
}
