import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <a href="/auth/google">
            <button className="ui red google button">
              <i className="google icon" />Sign in With Google
            </button>
          </a>
        );
      default:
        return (
          <a href="/api/logout">
            <button className="ui red google button">
              <i className="google icon" />
              Logout
            </button>
          </a>
        );
    }
  }
  render() {
    return (
      <nav>
        <div
          className="ui secondary pointing menu"
          style={{ background: '#49C3E0' }}
        >
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="item"
            style={{ padding: '5px' }}
          >
            Edge Broker Portal
          </Link>
          <ul className="right menu">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
