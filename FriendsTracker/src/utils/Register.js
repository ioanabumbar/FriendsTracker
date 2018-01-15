import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase";
import Firebase from "./firebase/Firebase";

class Register extends Component{

  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      type:"",
      username:""
    };
    this.dbRef = firebase.database().ref("users");
  }

//   componentWillUnmount () {
// firebaseApp.auth().signOut().then(function() {
//   // Sign-out successful.
//
// }, function(error) {
//   // An error happened.
// });
// }

  async signup() {
    email = this.state.email;
    pass = this.password;
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass);

        console.log("Account created");

    } catch (error) {
        console.log(error.toString())
    }
  }

  //add user to firebase
  _addNewUser(email, password,type, username) {
    console.log("add user");
    console.log(email, password);
    var user = this.dbRef.push();
    this.signup();

    return user.set({
      email: email,
      password: password,
      type: type,
      username: username
    }).then(() => {
      console.log("successful added user");
      Actions.pop();
    })
  }

  render(){
    return (
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={(email) => this.setState({email})}
          style = {styles.inputData}
          placeholder="email"
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={(password) => this.setState({password})}
          style = {styles.inputData}
          placeholder="password"
          secureTextEntry = {true}
        />
        <TextInput
          onChangeText={(type) => this.setState({type})}
          style = {styles.inputData}
          placeholder="type"
        />
        <TextInput
          onChangeText={(username) => this.setState({username})}
          style = {styles.inputData}
          placeholder="username"
        />
            <TouchableOpacity
              style = {styles.loginButton}
              onPress={this._addNewUser.bind(this)}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: '#7DA2CD'}}>
                  Register
                </Text>
            </TouchableOpacity>
      </View>

    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    backgroundColor: '#D1E0ED',
    padding:10
  },
  inputData: {
    alignItems: 'stretch',
    fontSize: 25,
    height: 44,
    marginTop: 30,
    backgroundColor:'#F1F1F1',
    color: '#616F7E',
    padding:8
  },
  loginButton: {
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor:'#C0BFB8',
    marginTop: 30,
    marginLeft: 110,
    height: 50,
    width: 130,
    padding: 10
  }
});

export default Register;
