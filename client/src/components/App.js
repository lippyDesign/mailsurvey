import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// COMPONENTS
import Header from './Header';
import Landing from './Landing';
// ACTIONS
import { fetchUser } from '../actions';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends React.Component {
  // we try to fetch user as soon as components mounts
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