import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Home from './src/Home';
import RequestRepository from './src/components/RequestRepository'
import RequestDetails from './src/components/RequestDetails';
import AddRequest from './src/components/AddRequest';
import StatusChart from './src/components/StatusChart';
import Login from './src/utils/Login';
import Register from './src/utils/Register';
import Firebase from './src/utils/firebase/Firebase';
import RequestsDatabase from './src/components/RequestsDatabase';
import HomePremium from './src/HomePremium';
import Places from './src/components/Places';

export default class App extends Component {
  constructor(props){
    super(props);
    Firebase.initialise();
    // this.state={
    //   loading:true,
    // };
  }

  render() {
      return(
        <Router>
          <Scene key="root">
            <Scene key="home"
              component={Home}
              title="Home"
            />
            <Scene key="homeP"
              component={HomePremium}
              title="Home"
            />
            <Scene
              key="requestRepository"
              component={RequestRepository}
              title="Requests List"
            />
            <Scene
              key="login"
              component={Login}
              title="Login"
              initial = {true}
            />
            <Scene
              key="firebase"
              component={Firebase}
              title="Firebase"
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
            <Scene
              key="requestsDatabase"
              component={RequestsDatabase}
              title="Requests"
            />
            <Scene
              key="places"
              component={Places}
              title="Visited places"
            />
          </Scene>
        </Router>
      )
  }
}


// const App = () => {
//   return (
//     <Router>
//       <Scene key="root">
//         <Scene key="home"
//           component={Home}
//           title="Home"
//         />
//         <Scene
//           key="requestRepository"
//           component={RequestRepository}
//           title="Requests List"
//         />
//         <Scene
//           key="login"
//           component={Login}
//           title="Login"
//         />
//         <Scene
//           key="firebase"
//           component={Firebase}
//           title="Firebase"
//         />
//         <Scene
//           key="requestDetails"
//           component={RequestDetails}
//           title="Request Specification"
//         />
//         <Scene
//           key="addRequestDetails"
//           component={AddRequest}
//           title="Input"
//         />
//         <Scene
//           key="statusChart"
//           component={StatusChart}
//           title="Chart"
//         />
//       </Scene>
//     </Router>
//   );
// }

// export default App;
