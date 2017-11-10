import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Button, TextInput, Picker
} from 'react-native';

const requestTypes = [
    {"id": 1, "type": "Parking Spot Rental"},
    {"id": 2, "type": "Parking Spot Reservation"},
    {"id": 3, "type": "Parking Subscription"},
    {"id": 4, "type": "Cancel Subscription"},
    {"id": 5, "type": "Cancel Reservation"},
    {"id": 5, "type": "Quit Rental"},
    {"id": 5, "type": "Drop out registration"}
];

const parkingNo = [
    {"id": 1},
    {"id": 2},
    {"id": 3},
    {"id": 4},
    {"id": 5},
    {"id": 6},
    {"id": 7}
];

export default class CreateRequest extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            //input fields state
            receiverEmail: "Receiver email",
            receiverName: "Receiver name",
            creatorName: "Creator name",
            requestType: "",

            //the request types
            requestTypesData: [],

            loaded: 0,

        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        // this.setState({
        //     requestTypesData: requestTypes,
        //     loaded: 1,
        // });

        fetch(`http://` + `192.168.56.1` + `:3004/requestTypes`)
            .then((response) => {
                if (response.status === 200) {
                    try {
                        return response.json();
                    } catch (e) {
                        console.log("Unable to parse response: " + response, e);
                        this.showRetry();
                        return null;
                    }
                }
                console.log("response: " + JSON.stringify(response));
                this.showRetry();
                return null;
            })
            .then((responseData) => {
                if (responseData !== null) {
                    console.log("responseData:"+JSON.stringify(responseData));
                    this.setState({
                        requestTypesData: responseData,
                        loaded: 1,
                    });
                } else {
                    this.showRetry();
                }
            })
            .catch((err) => {
                console.error(err);

                this.showRetry();
            })
            .done();

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showRetry() {
        this.setState({
            loaded: 2,
        });
    }

    render() {
        if (this.state.loaded === 0) {
            return (
                <View style={styles.screen}>
                    <Text> Please wait... </Text>
                    <ActivityIndicator/>
                </View>);
        } else if (this.state.loaded === 2) {
            return (
                <View style={styles.screen}>
                    <Text> The content is not available </Text>
                    <Button title="Retry" onPress={() => {
                        this.setState({loaded: 0});
                        this.fetchData();
                    }}/>
                </View>);
        }
        return (
            <View style={styles.screen}>
                <Text style={styles.title}>New Request</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({receiverEmail})}
                    value={this.state.receiverEmail}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({receiverName})}
                    value={this.state.receiverName}
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({creatorName})}
                    value={this.state.creatorName}
                />
                <Picker
                    selectedValue={this.state.requestType}
                    onValueChange={(itemValue, itemIndex) => this.setState({requestType: itemValue})}>

                    {/*<Picker.Item label="default" value="Choose request type" />*/}
                    {this.state.requestTypesData.map( (row, index) => (
                            <Picker.Item key="index" label={row.type} value="js" />
                        )
                    )}
                </Picker>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    screen:{
        backgroundColor: 'red',
    },
    title: {
        fontWeight:'bold',
        fontSize:20,
    },
    textInput: {
        height: 40,
        borderColor: '#cccccc',
        borderWidth: 2,
        margin: 10,
    }
});
