import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// COMPONENTS
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
// ACTIONS
import { fetchUser } from '../actions';

class App extends React.Component {
  // we try to fetch user as soon as components mounts (app loads)
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return <div>
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route exact path='/' component={Landing} />
            <Route exact path='/surveys' component={Dashboard} />
            <Route path='/surveys/new' component={SurveyNew} />
          </div>
        </div>
      </BrowserRouter>
    </div>;
  }
}

export default connect(null, { fetchUser })(App);