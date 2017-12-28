import React, { Component } from 'react';
import { StyleSheet, Text, View,  AppRegistry, Button, TextInput, Alert, Picker } from 'react-native';
import email from 'react-native-email';
import { Actions } from 'react-native-router-flux';

class RequestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {type: this.props.requestDetails.type,
            requestedAt: this.props.requestDetails.requestedAt,
            requestedFor: this.props.requestDetails.requestedFor,
            requestedFrom: this.props.requestDetails.requestedFrom,
            status: this.props.requestDetails.status,
            updateStatus:""
        };
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

    saveChanges = (newRequest) => {
        console.log("update: ", this.props.index);
        console.log("data: ", newRequest);
        Alert.alert(
            'Update request',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => { console.log("Yes pressed"); this.props.updateRequest(this.props.index, newRequest); Actions.pop(); }},
                {text: 'No', onPress: () => console.log("No pressed"), style: 'cancel'}
            ],
            { cancelable: false }
        )
    }

    removeRequestFromList = () => {
        console.log("delete: ", this.props.index);
        Alert.alert(
            'Delete request',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => { console.log("Yes pressed"); this.props.removeRequest(this.props.index); Actions.pop(); }},
                {text: 'No', onPress: () => console.log("No pressed"), style: 'cancel'}
            ],
            { cancelable: false }
        )
    }

    updateStatus = (status) => {
        this.setState({ status: status})
    }

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
            <View>
                <Text>---{this.props.requestDetails.type}---</Text>
                <Text>{"\n"}Requested at: {this.props.requestDetails.requestedAt}</Text>
                <Text>{"\n"}Requested for: {this.props.requestDetails.requestedFor}</Text>
                <Text>{"\n"}Requested from: {this.props.requestDetails.requestedFrom}</Text>
                <Text>{"\n"}Status: {this.props.requestDetails.status}</Text>


                <Picker selectedValue = {this.state.status} onValueChange = {this.updateStatus}>
                    <Picker.Item label = "Pending" value = "Pending" />
                    <Picker.Item label = "Approved" value = "Approved" />
                    <Picker.Item label = "Canceled" value = "Canceled" />
                </Picker>

                <Button title="Save Changes" onPress={() => this.saveChanges(this.state)} />
                <Button title="Remove" onPress={() => this.removeRequestFromList()} />
                <Button title="Send Mail" onPress={() => this.handleEmail()} />
                <Button title="View status chart" onPress={() => this.viewChart()} />
            </View>
        );
    }
}

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
