import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Base } from 'bw-axiom';

class Translator extends Component {
  static childContextTypes = {
    t: PropTypes.function,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
    t: PropTypes.func,
  };

  getChildContext() {
    return {
      t: this.props.t || (x => { return x; }),
    };
  }

  render() {
    const { children } = this.props;

    return (
      <Base>
        { children }
      </Base>
    );
  }
}

export default translate()(Translator);
