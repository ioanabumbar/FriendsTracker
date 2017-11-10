import React, {Component} from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, Button} from 'react-native';
import RequestsAPI from "../api/RequestsApi";

const listData = [
    {"id" : 1, "type" : "Friend Sent Request", "requestedAt" : "08:20 / 05.01.2017", "requestedFor" : "Ana Matei", "requestedFrom" : "Liana Pop", "status" : "Approved"},
    {"id" : 2, "type" : "Friend Sent Request", "requestedAt" : "16:00 / 29.05.2017", "requestedFor" : "Ana Matei", "requestedFrom" : "Sami Ionescu", "status" : "Pending"},
    {"id" : 3, "type" : "Friend Sent Request", "requestedAt" : "23:07/ 12.06.2017", "requestedFor" : "Gabriel Ciceu", "requestedFrom" : "Andrei Balea", "status" : "Approved"},
    {"id" : 4, "type" : "Friend Sent Request", "requestedAt" : "12:24 / 13.06.2017", "requestedFor" : "Filip Sauca", "requestedFrom" : "Liana Pop", "status" : "Canceled"},
];

export default class RequestListScreen extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: 0,
        }
    }

    componentDidMount() {
        this.fetchData();
        /*this.setState({
            loaded: 1,
        });
        */
    }

    showRetry() {
        this.setState({
            loaded: 2,
        });
    }

    fetchData() {
        //fetch("http://192.168.0.102:3004/requests")
         /*this.setState({
             dataSource: this.state.dataSource.cloneWithRows(listData),
             loaded: 1,
         });*/
        fetch(`http://` + `192.168.56.1` + `:3004/requests`)
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
                        dataSource: this.state.dataSource.cloneWithRows(responseData),
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

    renderRequest(request) {
        return (
            <View>
                <Text>{request.id} - {request.type}
                    {"\n"}Requested at: {request.requestedAt}
                    {"\n"}Requested by: {request.requestedFor}
                    {"\n"}Requested from: {request.requestedFrom}
                    {"\n"}Status: {request.status}
                    {"\n"}
                </Text>
            </View>
        );
    }

    render() {
        if (this.state.loaded === 0) {
            return (
                <View>
                    <Text> Welcome to the  Friends Tracker App! </Text>
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
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRequest}
                    style={styles.listView}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#f2f2f2',
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#f2f2f2',
    },
});
/*
return (
                <View>
                    <Text> The content is not available </Text>
                    <Button title="Retry" onPress={() => {
                        this.setState({loaded: 0});
                        this.fetchData();
                    }}/>
                </View>);
        }
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRequest}
                    style={styles.listView}
                />
            </View>

        );
    }
}

    const styles = StyleSheet.create({
        listView: {
            paddingTop: 20,
            backgroundColor: '#F5FCFF',
        },
});
*/