import React, { Component } from 'react';
import { StyleSheet, Text, View,  AppRegistry, Button, TextInput, Alert, Picker } from 'react-native';
import email from 'react-native-email';
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase";

class RequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:  this.props.requestDetails.id,
      type: this.props.requestDetails.type,
      requestedAt: this.props.requestDetails.requestedAt,
      requestedFor: this.props.requestDetails.requestedFor,
      requestedFrom: this.props.requestDetails.requestedFrom,
      status: this.props.requestDetails.status,
      updateStatus: ""
    };
    this.requestsDb = firebase.database().ref("requests");
  }

  handleEmail = () => {
    const to = ['ioana_bumbar@yahoo.com']
    email(to, {
      cc: [],
      bcc: '',
      subject: this.state.type,
      body: "Requested at: " + this.state.requestedAt + "\n Requested for: " + this.state.requestedFor
            + "\n Requested from: " + this.state.requestedFrom + "\n Status: " + this.state.status
    }).catch(console.error)
  }

  //update request locally or to db.json
  saveChanges = (newRequest) => {
    // console.log("update index: ", this.props.index);
    console.log("update id: ", this.state.id);
    // console.log("data: ", newRequest);
    Alert.alert(
      'Update request',
      'Are you sure?',
      [
          {text: 'Yes', onPress: () => { console.log("Yes pressed"); this.props.updateRequest(this.props.index, newRequest); Actions.pop(); }},//Actions.pop(); }},
          {text: 'No', onPress: () => console.log("No pressed"), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  //remove request locally or to db.json
  removeRequestFromList = () => {
    console.log("delete: ", this.props.index);
    Alert.alert(
      'Delete request',
      'Are you sure?',
      [
          {text: 'Yes', onPress: () => { console.log("Yes pressed"); this.props.removeRequest(this.props.index, this.state.id); Actions.pop(); }}, //Actions.pop(); }},
          {text: 'No', onPress: () => console.log("No pressed"), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  //update request from firebase
  saveChanges2 = (newRequest) => {
    // console.log("update index: ", this.props.index);
    console.log("update id: ", this.state.id);
    console.log("status: ", this.state.status);
    // console.log("data: ", newRequest);
    Alert.alert(
      'Update request',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => {
          console.log("Yes pressed");
          console.log("key: ", this.props.requestDetails._key);
          var request = this.requestsDb.child(this.props.requestDetails._key);
          // console.log(this.props.requestDetails.key);
          return request.update({
            "status": newRequest.status
          }).then(() =>
            {Actions.pop();
            console.log("successful update")}
          );}
       },
       {text: 'No', onPress: () => console.log("No pressed"), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  //delete request from firebase
  removeRequestFromList2 = () => {
    console.log("delete: ", this.props.index);
    Alert.alert(
      'Delete request',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => {
          console.log("Yes pressed");
          console.log("key: ", this.props.requestDetails._key);
          var request = this.requestsDb.child(this.props.requestDetails._key);
          console.log(this.props.requestDetails._key);
          return request.remove().then(() =>
          {Actions.pop();
            console.log("successful delete");}
          );}
        },
        {text: 'No', onPress: () => console.log("No pressed"), style: 'cancel'}
      ],
      { cancelable: false }
    )
  }

  //update status from picker
  updateStatus = (status) => {
    this.setState({ status: status})
  }

  //char of a request status
  viewChart = () => {
    var number = 2;
    console.log("number: ",number);
    if(this.state.status == 'Approved')
      number = 3;
    if(this.state.status == 'Canceled')
      number = 1;
    console.log("number2: ",number);
    Actions.statusChart({ status: this.state.status, statusNo: number });
  }

  render() {
    return (
      <View  style = {styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#625b56', marginLeft: 80}}>{this.props.requestDetails.type}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#625b56'}}>{"\n"}Requested at: {this.props.requestDetails.requestedAt}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#625b56'}}>{"\n"}Requested for: {this.props.requestDetails.requestedFor}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#625b56'}}>{"\n"}Requested from: {this.props.requestDetails.requestedFrom}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#625b56'}}>{"\n"}Status: {this.props.requestDetails.status}</Text>


        <Picker selectedValue = {this.state.status} onValueChange = {this.updateStatus}>
          <Picker.Item label = "Pending" value = "Pending" />
          <Picker.Item label = "Approved" value = "Approved" />
          <Picker.Item label = "Canceled" value = "Canceled" />
        </Picker>

        <View style = {styles.buttonStyle}>
          <Button color="white" title="Save Changes" onPress={() => this.saveChanges(this.state)} />
        </View>
        <View style = {styles.buttonStyle}>
          <Button color="white" title="Remove" onPress={() => this.removeRequestFromList()} />
        </View>
        <View style = {styles.buttonStyle}>
          <Button color="white" title="Send Mail" onPress={() => this.handleEmail()} />
        </View>
        <View style = {styles.buttonStyle}>
          <Button color="white" title="View status chart" onPress={() => this.viewChart()} />
        </View>
      </View>
    );
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
    fontSize: 8,
    height: 10,
    marginTop: 10,
    backgroundColor:'#F1F1F1',
    color: '#616F7E',
    padding: 4
  },
  buttonStyle: {
    marginTop:5,
    marginLeft: 30,
    marginRight: 30,
    padding: 2,
    backgroundColor: '#818C9F'
  }
});

export default RequestDetails;

// render() {
//   return (
//     <View>
//       <Text>{this.props.requestDetails.id} - {this.props.requestDetails.type}</Text>
//       <TextInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//         onChangeText={(type) => this.setState({type})} value={this.state.type}/>
//       <Text>{"\n"}Requested at: {this.props.requestDetails.requestedAt}</Text>
//       <TextInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//         onChangeText={(at) => this.setState({at})} value={this.state.requestedAt}/>
//       <Text>{"\n"}Requested for: {this.props.requestDetails.requestedFor}</Text>
//       <TextInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//         onChangeText={(rfor) => this.setState({rfor})} value={this.state.requestedFor}/>
//       <Text>{"\n"}Requested from: {this.props.requestDetails.requestedFrom}</Text>
//       <TextInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//         onChangeText={(from) => this.setState({from})} value={this.state.requestedFrom}/>
//       <Text>{"\n"}Status: {this.props.requestDetails.status}</Text>
//       <TextInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//         onChangeText={(status) => this.setState({status})} value={this.state.status}/>
//
//       <Button title="Save Changes" onPress={() => this.saveChanges(this.state)} />
//       <Button title="Remove" onPress={() => this.removeRequestFromList()} />
//       <Button title="Send Mail" onPress={() => this.handleEmail()} />
//     </View>
//   );
// }
