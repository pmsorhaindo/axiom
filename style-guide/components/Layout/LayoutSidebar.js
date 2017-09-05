import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GithubLink from '../GithubLink/GithubLink';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

export default class LayoutSidebar extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <div className="dm-layout__sidebar">
        <div className="dm-layout__sidebar-body">
          { children }
        </div>

        <div className="dm-layout__sidebar-footer">
          <ThemeSwitcher />
          <GithubLink />
        </div>
      </div>
    );
  }
}
