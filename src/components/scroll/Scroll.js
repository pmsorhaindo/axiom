import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Base from '../base/Base';
import './Scroll.css';

export default class Toggle extends Component {
  static propTypes = {
    /** Label that is inserted next to the toggle switch */
    children: PropTypes.node,
    /** Disabled control of the switch */
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  };

  componentDidMount() {
    // const node = this.getDOMNode();
    // dragStream(node).onValue(this.setXandY); //rxjs stream
  }

  setXandY(event) {
    // DOM Manipulation of x and y on your node
  }

  render() {
    const { children, disabled, ...rest } = this.props;

    return (
      <Base Component="label" className="ax-scroll" space="x2">
        { children && (
          <span className="ax-scroll__label">
            { children }
          </span>
        ) }

        <div className="ax-scroll__control">
          <div className="ax-scroll__marker"/>
        </div>
      </Base>
    );
  }
}
