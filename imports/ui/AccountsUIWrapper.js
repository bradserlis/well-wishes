import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import { Container } from 'semantic-ui-react';


export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    Blaze.remove(this.view);
  }

  render() {
    return (
      <div className='account-container'>
        <span ref='container' />
      </div>
    );
  }
}

