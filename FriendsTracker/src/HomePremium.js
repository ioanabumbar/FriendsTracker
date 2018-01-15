import React, { Component } from 'react';
import {StyleSheet, View, Button, Text} from 'react-native'
import { Actions } from 'react-native-router-flux';
import RequestRepository from './components/RequestRepository';
import * as firebase from "firebase";
import Login from "./utils/Login";
import Firebase from "./utils/firebase/Firebase";
import RequestsDatabase from './components/RequestsDatabase';

class HomePremium extends Component{
  constructor(props){
    super(props);
  }

  goToRequests = () => {
    // Actions.requestRepository();
    Actions.requestsDatabase();
  }

  goToPlaces = () => {
    // Actions.requestRepository();
    Actions.places();
  }

  login = () => {
    Actions.login();
  }

  async signup() {
    email = "name3@yahoo.com";
    pass = "abcdef";
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass);

        console.log("Account created");

        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
        console.log(error.toString())
    }
  }

  async logout() {
    try {
        await firebase.auth().signOut();
        console.log("Logged out");
        Actions.pop();

    } catch (error) {
        console.log(error);
    }

  }

  render() {
      return (
        <View style = {styles.container}>
          <View style = {styles.buttonStyle}>
            <Button color = "#E8E1D7" title="Requests" onPress={()=>this.goToRequests()} />
          </View>
          <View style = {styles.buttonStyle}>
          <Button color = "#E8E1D7" title="Visited places" onPress={()=>this.goToPlaces()} />
          </View>
          <View style = {styles.buttonStyle}>
            <Button color = "#E8E1D7" title="Sign up" onPress={()=>this.signup()} />
          </View>
          <View style = {styles.buttonStyle}>
            <Button color = "#E8E1D7" title="Logout" onPress={()=>this.logout()} />
          </View>
        </View>
      )}
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    backgroundColor: '#D1E0ED',
    padding:10
  },
  buttonStyle: {
    borderRadius: 50,
    marginTop:50,
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    backgroundColor: '#818C9F'
  }
});

export default HomePremium;
