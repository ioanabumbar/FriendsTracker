import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { VictoryContainer, VictoryBar, VictoryPie, VictoryLine, VictoryChart, VictoryAxis } from "victory-native";

class StatusChart extends Component{

  constructor(props){
    super(props);
    // this.status = {"status": this.props.status};
    this.state = {
      data: [
        {quarter: 1, earnings: 2},
        {quarter: 2, earnings: 3},
        {quarter: 3, earnings: 1},
        {quarter: 4, earnings: this.props.statusNo}
      ]
    }
  }

  render() {
    console.log("aa");
    return(
      <View>
        <VictoryChart>
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Pending", "Approved", "Canceled", this.props.status]}
          />
          <VictoryBar
            data={this.state.data}
            x="quarter"
            y="earnings"
          />
        </VictoryChart>
      </View>
    );
  }
}

export default StatusChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1
    }
});
