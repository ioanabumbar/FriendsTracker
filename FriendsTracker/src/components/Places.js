import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RequestDetails from './RequestDetails.js';
import { List, ListItem } from 'react-native-elements';
import RequestsApi from '../api/RequestsApi';

class Places extends Component {
    constructor(props){
    super(props);
    this.state = {
      avatar:'https://i.pinimg.com/564x/a4/e2/9e/a4e29e3d9cdbd8be08de7399ebc0fe0c--map-marker-location-map.jpg',
      places: [
        {
           id: 1,
           date: "08:20 / 05.01.2017",
           street: "Strada Mihail Kogălniceanu 1, Cluj-Napoca 400084",
           coordinates: "46.768080, 23.591594"
       },
       {
           id: 2,
           date: "12:05 / 05.01.2017",
           street: "Strada Memorandumului 6, Cluj-Napoca 400000",
           coordinates: "46.770307, 23.587775"
       },
       {
           id: 3,
           date: "15:57 / 05.01.2017",
           street: "Strada Alexandru Vaida Voevod 53B, Cluj-Napoca 4004364",
           coordinates: "46.772306, 23.627085"
       },
       {
           id: 4,
           date: "20:12 / 05.01.2017",
           street: "Strada Arad 25, Cluj-Napoca 400000",
           coordinates: "46.786001, 23.618523"
       }
      ]
    }
  }

  goToDetails = (place, index) => {
    console.log(place);
  }

  render() {
    return(
      <View style = {styles.container}>
        <List containerStyle={{marginBottom: 30}}>
          {
              this.state.places.map((item, i) => (
              <ListItem
              key={i}
              avatar={{uri:this.state.avatar}}
              title={item.street}
              rightTitle={item.date}
              onPress = {() => this.goToDetails(item, i)} />
            ))
          }
          </List>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E0ED',
  }
});

export default Places;
