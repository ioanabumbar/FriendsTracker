import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Home from './src/Home';
import RequestRepository from './src/components/RequestRepository'
import RequestDetails from './src/components/RequestDetails';
import AddRequest from './src/components/AddRequest';
import StatusChart from './src/components/StatusChart';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home"
          component={Home}
          title="Home"
        />
        <Scene
          key="requestRepository"
          component={RequestRepository}
          title="Requests List"
        />
        <Scene
          key="requestDetails"
          component={RequestDetails}
          title="Request Specification"
        />
        <Scene
          key="addRequestDetails"
          component={AddRequest}
          title="Input"
        />
        <Scene
          key="statusChart"
          component={StatusChart}
          title="Chart"
        />
      </Scene>
    </Router>
  );
}

export default App;
