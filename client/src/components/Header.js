import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends React.Component {
  renderContent() {
    switch(this.props.currentUser) {
      case null: return;
      case false: return <li><a href="/auth/google">Sign In with Google</a></li>;
      default: return [
        <li key='1'><Payments/ ></li>,
        <li key='2'><a href="/api/logout">Sign Out</a></li>
      ]
    }
  }
  render() {
    return <nav>
      <div className="nav-wrapper">
        <Link className="left brand-logo" to={this.props.currentUser ? '/surveys' : '/'}>
          Email Survey
        </Link>
        <ul className="right">
          {this.renderContent()}
        </ul>
      </div>
    </nav>;
  }
}

const mapStateToProps = state => ({ currentUser: state.auth.currentUser });

export default connect(mapStateToProps)(Header);