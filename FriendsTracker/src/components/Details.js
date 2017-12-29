import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class RequestDetails extends Component {
  constructor(props) {
    super(props);
    console.log("gfd");
    this.state = {type: props.type2,
                  requestedAt: props.requestedAt2,
                  requestedFor: props.requestedFor2,
                  requestedFrom: props.requestedFrom2,
                  status: props.status2
                };
  }

  render(){
    return(
      <View>
        <Text>{this.props.type2}:</Text>
        <Text>At: {this.propss.requestedAt2} </Text>
        <Text>For: {this.props.requestedFor2} </Text>
        <Text>From: {this.props.requestedFrom2} </Text>
        <Text>Status: {this.props.status2} </Text>
      </View>
    )
  }
}

export default Details;
