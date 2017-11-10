import React, {Component} from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import {TabNavigator} from "react-navigation";
import RequestListScreen from "./src/screens/RequestList";
import CreateRequest from "./src/screens/CreateRequest";

const MainScreenNavigator = TabNavigator({
    'Requests': {screen: RequestListScreen},
    'Create Request': {screen: CreateRequest},
});

const MainApp = StackNavigator({
    Home: {
        screen: MainScreenNavigator,
        navigationOptions: {
            title: 'Tracking Friends System',
        },
    },
});

export default class App extends Component {
    render() {
        return <MainApp/>;
    }
}
/*
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello world!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
