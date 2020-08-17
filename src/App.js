import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from "./components/context/UserContext";


//component
import Home from './components/Home';

const App = () => {
  return (
    <React.Fragment>
      <UserProvider>
      <Home/>
      </UserProvider>
    </React.Fragment>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
