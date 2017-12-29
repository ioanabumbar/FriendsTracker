import React, { Component } from 'react';
import {View, Button, Text} from 'react-native'
import { Actions } from 'react-native-router-flux';
import RequestRepository from './components/RequestRepository';


class Home extends Component{

  goToRequests = () => {
    Actions.requestRepository();
  }

  render() {
      return (
        <View>
          <Button title="Go to requests" onPress={()=>this.goToRequests()} />
        </View>
      )}
}

export default Home;
