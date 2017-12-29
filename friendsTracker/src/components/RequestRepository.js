import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RequestDetails from './RequestDetails.js';
import { List, ListItem } from 'react-native-elements';

class RequestRepository extends Component {
  constructor(props){
    super(props)
    this.state = {
      requests: [
        {
            id: 1,
            type: "Friend Request",
            requestedAt: "08:20 / 05.01.2017",
            requestedFor: "Ana Matei",
            requestedFrom: "Liana Pop",
            status: "Approved"
        },
        {
            id: 2,
            type: "Friend Request",
            requestedAt: "16:00 / 29.05.2017",
            requestedFor: "Ana Mateiii",
            requestedFrom: "Sami Ionescu",
            status: "Pending"
        },
        {
            id: 3,
            type: "Friend Request",
            requestedAt: "23:07/ 12.06.2017",
            requestedFor: "Gabriel Ciceu",
            requestedFrom: "Andrei Balea",
            status: "Approved"
        },
        {
            id: 4,
            type: "Friend Request",
            requestedAt: "12:24 / 13.06.2017",
            requestedFor: "Filip Sauca",
            requestedFrom: "Liana Pop",
            status: "Canceled"
        }
      ]
      }
    }

    componentDidMount = () => {
      AsyncStorage.getItem('requestsList', (err, result) => {
      const requestsData = this.state.requests;

      if(result != null){
        this.setState({
          requests: JSON.parse(result)
        })
      }
      else{
        //console.log("Not found!");
        AsyncStorage.setItem('requestsList', JSON.stringify(requestsData))
      }
    });
  }

  addRequest = (newRequest) =>{
    console.log("r: ", newRequest);
    AsyncStorage.getItem('requestsList').then((result) => {
      const array = JSON.parse(result)
      array.push(newRequest)
      this.setState({
        requests: array
      });
      AsyncStorage.setItem('requestsList', JSON.stringify(array));
    }).done();
  }

  // removeRequest = (idToBeDeleted) => {
  //   console.log("r: ", idToBeDeleted)
  //   AsyncStorage.removeItem('requestsList').then(
  //     () => {
  //       console.log("resolved");
  //     },
  //     () => {
  //       console.log("rejected");
  //     }
  //   )

  removeRequest = (requestIndex) => {
    AsyncStorage.getItem("requestsList").then((result) =>{
      const array = JSON.parse(result);
      const newArray = [];
      for(var i = 0; i < array.length; i++){
        if(i != requestIndex)
         newArray.push(array[i])
      }
      this.setState({
        requests: newArray
      });
      AsyncStorage.setItem('requestsList', JSON.stringify(newArray));
    }).done();
  }

  updateRequest = (requestIndex, updatedRequest) => {
    AsyncStorage.getItem("requestsList").then((result) =>{
      const array = JSON.parse(result);
      const newArray = [];
      for(var i = 0; i < array.length; i++){
        if(i != requestIndex){
         newArray.push(array[i])
       }else {
        newArray.push(updatedRequest)
       }
      }
      this.setState({
        requests: newArray
      });
      AsyncStorage.setItem('requestsList', JSON.stringify(newArray));
    }).done();
  }

  addRequestData = (requests, newRequest) => {
    Actions.addRequestDetails(requests, newRequest)
  }

  goToDetails = (request, index, removeRequestFromList, updateRequestFromList) => {
    console.log(request.id);
    /*requestObj = {
          "id": request.id,
          "type": request.type,
          "requestedAt": request.requestedAt,
          "requestedFor": request.requestedFor,
          "requestedFrom": request.requestedFrom,
          "status": request.status
      };*/
    Actions.requestDetails({requestDetails: request, index: index, removeRequest: removeRequestFromList, updateRequest: updateRequestFromList});
  }

  render() {
    return(
      <View>
      <List>
        {
            this.state.requests.map((item, i) => (
            <ListItem
            key={i}
            title={item.requestedFor}
            rightTitle={item.requestedFrom}
            subtitle={item.type}
            onPress = {() => this.goToDetails(item, i, this.removeRequest, this.updateRequest)} />
          ))
        }
        </List>
        <Button title="Add request" onPress={() => this.addRequestData({requests:this.state.requests, newRequest:this.addRequest})} />
      </View>
    );
  }

  // render() {
  //     //console.log("AAAAAAAA", this.state.requests.map((item, index) => (item.requestedFor)));
  //   return (
  //     <View>
  //         {this.state.requests.map((item, index) => (
  //           <TouchableOpacity
  //             key={item.id}
  //             onPress={() => this.goRequest(item)}>
  //             <Text>{item.requestedFor}</Text>
  //           </TouchableOpacity>
  //         ))}
  //     </View>
  //   );
  // }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

export default RequestRepository;
