import * as firebase from "firebase";

class Firebase {
  static initialise() {
    firebase.initializeApp({
          apiKey: "AIzaSyDfBBcvCyrpEU1vCvU3qcAOeMQhEs_qRQg",
          authDomain: "friends-tracker-cf4ab.firebaseapp.com",
          databaseURL: "https://friends-tracker-cf4ab.firebaseio.com",
          projectId: "friends-tracker-cf4ab",
          storageBucket: "friends-tracker-cf4ab.appspot.com",
          messagingSenderId: "972957567142"
        });
  }
}

module.exports = Firebase;
