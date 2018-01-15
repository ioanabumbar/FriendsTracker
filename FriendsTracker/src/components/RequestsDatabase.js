import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RequestDetails from './RequestDetails.js';
import { List, ListItem } from 'react-native-elements';
import * as firebase from "firebase";

class RequestsDatabase extends Component {
  constructor(props){
    super(props);
    //get the requests table
    this.requestsDb = firebase.database().ref("requests");

    this.state = {
      requests: [],
      loaded: false
    }
    //this.getRequests();
  }

  componentDidMount() {
    this.setState({loaded: true});
    this.getRequests();
  }

  // componentWillUpdate() {
  //   if(this)
  // }

  getRequests() {
    array = [];
    //get the logged user
    var user = firebase.auth().currentUser;
    //console.log("user: ", user.email);

    //query the database for the requests of the user
    var query = this.requestsDb.orderByChild("requestedFor").equalTo(user.email);
    query.on("value", function(snapshot){
      snapshot.forEach(function(child){
        //console.log("req for: ", child.val().requestedFor);
        // console.log("key: ", child.key);
        array.push({
          type: child.val().type,
          requestedAt: child.val().requestedAt,
          requestedFor: child.val().requestedFor,
          requestedFrom: child.val().requestedFrom,
          status: child.val().status,
          _key: child.key
        });
      });
      this.setState({
        requests: array
      })
    }.bind(this));
  }

  addRequestData = () => {
    Actions.addRequestDetails();
  }

  goToDetails = (request, index) => {
    console.log("item key: ", request._key);
    //go to the details view
    Actions.requestDetails({requestDetails: request, index: index});
  }
  render() {
    return(
      <View style = {styles.container}>
      <List>
        {
          this.state.requests.map((item, i) => (
          <ListItem
          key={i}
          title={item.requestedFrom}
          rightTitle={item.requestedFor}
          subtitle={item.type}
          onPress = {() => this.goToDetails(item, i)} />
          ))
        }
        </List>
        <View style = {styles.buttonStyle}>
          <Button color = "#E8E1D7" title="Add request" onPress={() => this.addRequestData()} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E0ED',
  },
  buttonStyle: {
    borderRadius: 50,
    marginTop:20,
    marginLeft: 70,
    marginRight: 70,
    padding: 20,
    backgroundColor: '#818C9F'
  }
});

export default RequestsDatabase;
