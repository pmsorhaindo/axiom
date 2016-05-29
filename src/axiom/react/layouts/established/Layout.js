import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { enhance, addPropTypes, addClassName } from '../../utils/components';

export class Layout extends Component {
  static propTypes = {
    children: { node: true, isRequired: true },
  };

  static childContextTypes = {
    showSidebar: PropTypes.func,
    hideSidebar: PropTypes.func,
    toggleSidebar: PropTypes.func,
  };

  getChildContext() {
    return {
      showSidebar: ::this.showSidebar,
      hideSidebar: ::this.hideSidebar,
      toggleSidebar: ::this.toggleSidebar,
    };
  }

  componentWillMount() {
    this.hideSidebar();
  }

  showSidebar() {
    this.setState({ open: true });
  }

  hideSidebar() {
    this.setState({ open: false });
  }

  toggleSidebar() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { className, children } = this.props;
    const { open } = this.state;
    const classes = classnames(className,
      'ax-layout--established', {
        'ax-layout--established--open': open,
      }
    );

    return (
      <div className={ classes }>
        { children }
      </div>
    );
  }
}

export default enhance(Layout)(
  addPropTypes('global'),
  addClassName('global'),
);
