import React, { Component } from 'react';
import {View, Button, Text} from 'react-native'
import { Actions } from 'react-native-router-flux';
import RequestRepository from './components/RequestRepository.js';

class Home extends Component{

    goToRequests = () => {
        Actions.requestRepository();
    }

    render() {
        console.log("aa");
        return (
            <View>
                <Button title="Go to requests" onPress={()=>this.goToRequests()} />
            </View>
        )}
}

export default Home;
