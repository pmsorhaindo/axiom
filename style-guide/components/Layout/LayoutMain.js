import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class LayoutMain extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static contextTypes = {
    hideSidebar: PropTypes.func,
  };

  render() {
    const { children } = this.props;
    const { hideSidebar } = this.context;

    return (
      <div className="dm-layout__main" onClick={ hideSidebar }>
        { children }
      </div>
    );
  }
}
