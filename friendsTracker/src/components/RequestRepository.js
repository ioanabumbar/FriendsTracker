import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RequestDetails from './RequestDetails.js';
import { List, ListItem } from 'react-native-elements';
import RequestsApi from '../api/RequestsApi';

class RequestRepository extends Component {
  constructor(props){
    super(props);
    this.state = {
      requests: []
      }
    }

  componentDidMount = () => {
    //this.getRequestsAPI();
    this.getRequests();
  }

  getRequests = () => {
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
    console.log("update: ": updatedRequest);
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

  //requests api
  getRequestsAPI = () => {
     // console.log("repo");
    RequestsApi.getRequests()
      .then((responseData) => {
        // console.log("repo data: ", responseData);
        if(responseData !== null){
          //  console.log("data: ", responseData);
          this.setState({
            requests: responseData
          });
        } else {
            console.log("data not found");
            this.setState({
              requests: []
            });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .done();
  }

  addRequestAPI = (newRequest) =>{
    //console.log("da ",newRequest.status);
    console.log("add", newRequest.type);
    RequestsApi.addRequest(newRequest: newRequest)//{rtype: newRequest.type, at: newRequest.requestedAt, rfor: newRequest.requestedFor, from: newRequest.requestedFrom, status: newRequest.status})
      .then((responseData) => {
        // console.log("repo data: ", responseData);
        if(responseData !== null){
          console.log("data: ", responseData);
          this.getRequestsAPI();
        } else {
            console.log("data not found");
            this.setState({
              requests: []
            });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .done();
  }

  updateRequestAPI = (index, updatedRequest) => {
    console.log("update",index, ": ", updatedRequest.id);
    RequestsApi.updateRequest(updatedRequest.id: id, updatedRequest: updatedRequest)//{rtype: newRequest.type, at: newRequest.requestedAt, rfor: newRequest.requestedFor, from: newRequest.requestedFrom, status: newRequest.status})
      .then((responseData) => {
        // console.log("repo data: ", responseData);
        if(responseData !== null){
          console.log("data: ", responseData);
          this.getRequestsAPI();
        } else {
            console.log("data not found");
            this.setState({
              requests: []
            });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .done();
  }

  removeRequestAPI = (index, id) => {
    console.log("delete",index, ": ", id);
    RequestsApi.deleteRequest(id: id)//{rtype: newRequest.type, at: newRequest.requestedAt, rfor: newRequest.requestedFor, from: newRequest.requestedFrom, status: newRequest.status})
      .then((responseData) => {
        if(responseData !== null){
          console.log("delete data: ", responseData);
          this.getRequestsAPI();
        } else {
            console.log("data not found");
            this.setState({
              requests: []
            });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .done();
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
