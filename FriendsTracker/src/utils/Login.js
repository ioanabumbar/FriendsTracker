import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, AppRegistry, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import * as firebase from "firebase";
import { Actions } from 'react-native-router-flux';
import UsersApi from '../api/UsersApi';
import Home from '../Home.js'
import Firebase from "./firebase/Firebase";
import HomePremium from '../HomePremium.js';
import Register from './Register.js';

class Login extends Component {
  constructor(props){
    super(props);
    if (!firebase.apps.length) {
      firebase.initialise();
    }
    this.state = {
        email: "",
        password: "",
        response: ""
    };

    // this.signup = this.signup.bind(this);
    // this.login = this.login.bind(this);
  }


  _login() {
    console.log(this.state.email, ": ", this.state.password);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    });
  }

  // goRegister(){
  //   Actions.register();
  // }
  componentWillMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      var role;
        if (user) {
          var ref = firebase.database().ref("users");
          var query = ref.orderByChild("email").equalTo(user.email);
          query.once("value", function(snapshot) {
          snapshot.forEach(function(child) {
          role=child.val().type;
            if(role == "premium"){
                    console.log("premium user");
                    Actions.homeP();
            }
            else{
                console.log("default user")
                      Actions.home();
            }
          });
        });
      }
    });
  }

  componentWillUnmount() {
      this.unsubscribe()
  }

  async signup() {

        DismissKeyboard();

        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "account created"
            });

            setTimeout(() => {
                Actions.home();
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    render() {
    return(
      <View style = {styles.container}>
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
        <TouchableOpacity
          style = {styles.loginButton}
          onPress={this._login.bind(this)}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#7DA2CD'}}>
              Login
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
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

export default Login;
