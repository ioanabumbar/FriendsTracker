import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase";

class AddRequest extends Component{

  constructor(props){
    super(props);
    this.state={
      type:"",
      requestedAt:"",
      requestedFor:"",
      requestedFrom:"",
      status:""
    };
    this.requestsDb = firebase.database().ref("requests");
  }

  //add request locally or to db.json
  addRequestToList = (type, requestedAt, requestedFor, requestedFrom, status) =>{
    const request = {
      type:type,
      requestedAt:requestedAt,
      requestedFor:requestedFor,
      requestedFrom:"Ana",
      status:status
    }
    this.props.newRequest(request);
    Actions.pop();
  }

  //add request to firebase
  addRequestToList2 = (type, requestedAt, requestedFor, requestedFrom, status) =>{
    var request = this.requestsDb.push();
    var user = firebase.auth().currentUser;
    console.log("sss: ", status);
    return request.set({
      type:type,
      requestedAt:requestedAt,
      requestedFor:requestedFor,
      requestedFrom:user.email,
      status:status
    }).then(() => {
      console.log("successful add");
      Actions.pop();
    })
  }

  render(){
    return (
      <View style = {styles.container}>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#7DA2CD'}}>Type</Text>
        <TextInput
          style = {styles.inputData}
          placeholder = {this.state.status}
          onChangeText={(type) => this.setState({type})} value={this.state.type}/>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#7DA2CD'}}>Date</Text>
        <TextInput
          style = {styles.inputData}
          placeholder = {this.state.requestedAt}
          onChangeText={(requestedAt) => this.setState({requestedAt})} value={this.state.requestedAt}/>
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#7DA2CD'}}>For</Text>
        <TextInput
          style = {styles.inputData}
          placeholder = {this.state.requestedFor}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(requestedFor) => this.setState({requestedFor})} value={this.state.requestedFor}/>
        <View style = {styles.buttonStyle}>
          <Button color = "#E8E1D7" title="Save request" onPress = {() => this.addRequestToList(this.state.type, this.state.requestedAt, this.state.requestedFor, this.state.requestedFrom, 'Pending')} />
        </View>
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
    marginTop: 20,
    marginBottom: 30,
    backgroundColor:'#F1F1F1',
    color: '#616F7E',
    padding:8
  },
  buttonStyle: {
    marginTop:30,
    marginLeft: 30,
    marginRight: 30,
    padding: 20,
    backgroundColor: '#818C9F'
  }
});

export default AddRequest
