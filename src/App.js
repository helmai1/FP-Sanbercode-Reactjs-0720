import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//component
import Home from './components/Home';

const App = () => {
  return (
    <React.Fragment>
      <Home/>
    </React.Fragment>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
