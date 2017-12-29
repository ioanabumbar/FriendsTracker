import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'

class AddRequest extends Component{

  constructor(props){
    super(props);
    this.state={
      type:"",
      requestedAt:"",
      requestedFor:"",
      requestedFrom:"",
      status:""
    }
  }

  addRequestToList = (type, requestedAt, requestedFor, requestedFrom, status) =>{
    const request = {
      type:type,
      requestedAt:requestedAt,
      requestedFor:requestedFor,
      requestedFrom:requestedFrom,
      status:status
    }
    this.props.newRequest(request);
    Actions.pop();
  }

  render(){
    return (
      <View>
        <Text>Type</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = {this.state.status}
          onChangeText={(type) => this.setState({type})} value={this.state.type}/>
        <Text>Date</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = {this.state.requestedAt}
          onChangeText={(requestedAt) => this.setState({requestedAt})} value={this.state.requestedAt}/>
        <Text>For</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = {this.state.requestedFor}
          onChangeText={(requestedFor) => this.setState({requestedFor})} value={this.state.requestedFor}/>
        <Text>From</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = {this.state.requestedFrom}
          onChangeText={(requestedFrom) => this.setState({requestedFrom})} value={this.state.requestedFrom}/>
        <Button title="Save request" onPress = {() => this.addRequestToList(this.state.type, this.state.requestedAt, this.state.requestedFor, this.state.requestedFrom, 'Pending')} />
      </View>

    )
  }
}

export default AddRequest
