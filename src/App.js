import React, { Component } from 'react';

import LoginPage from './components/login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">
        header
        </header>
        <div>
         <LoginPage />
        </div>


      </div>
    );
  }
}

export default App;
