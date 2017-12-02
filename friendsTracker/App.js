import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from 'react-navigation';
import {TabNavigator} from "react-navigation";
import RequestListScreen from "./src/screens/RequestList";
import CreateRequest from "./src/screens/CreateRequest";
/*
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
*/
/*export default class App extends Component {
    render() {
        return <MainApp/>;
    }
}*/

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {showText: true};

        setInterval(() => {
            this.setState(previousState => {
                return {showText: !previousState.showText};
            });
        }, 1000);
    }

    render(){
        let display = this.state.showText ? this.props.text  : ' ';
        return (
            <Text>{display}</Text>
        );
    }
}

export default class App extends Component {
  render() {
    return (
      <View>
          <Blink text='I love'/>
          <Blink text='AAAA'/>
      </View>
    );
  }
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/