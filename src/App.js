import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Header from './components/header';
import Footer from './components/footer';

import LinkList from './components/linkList';
import CreateLinks from './components/createLinks'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/new" component={LinkList} />
            <Route exact path="/create" component={CreateLinks} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
