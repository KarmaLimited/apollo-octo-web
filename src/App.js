import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/login';
import Header from './components/header';
import Footer from './components/footer';

import LinkList from './components/linkList';
import CreateLinks from './components/createLinks';
import Search from './components/search';
import './App.css';
import { AUTH_TOKEN } from './components/utils/constants';

class App extends React.Component {
  render() {
    const auth = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            {auth ? (<div>
              <Route exact path="/login" component={Login} />
              <Route exact path="/new" render={() => <Redirect to="/new/1" />} />

              <Route exact path="/create" component={CreateLinks} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/top" component={LinkList} />
              <Route exact path="/new/:page" component={LinkList} />
            </div>) : (
                <div>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/top" component={LinkList} />
                  <Route exact path="/new" component={LinkList} />
                </div>)
            }
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
