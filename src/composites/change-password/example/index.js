import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ExampleConfig } from 'style-guide';
import { ChangePassword } from 'bw-axiom';

class ChangePasswordExample extends Component {

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  static propTypes = {
    components: PropTypes.shape({
      ChangePassword: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const { components } = this.props;
    const { t } = this.context;

    console.log('ChangePassword Example context', t);

    const propTypes = {
      ChangePassword: components.ChangePassword,
    };

    const initalProps = {
      ChangePassword: {
        isOpen: false,
        onRequestClose: () => {},
        onSubmit: () => {},
      },
    };

    const initialPropOptions = {
      ChangePassword: {
        onRequestClose: {
          callback: (setProp) => setProp('ChangePassword', 'isOpen', false),
        },
      },
    };

    return (
      <ExampleConfig
          hasVisual={ false }
          initialPropOptions={ initialPropOptions }
          initialProps={ initalProps }
          propTypes={ propTypes }>
        <ChangePassword { ...initalProps.ChangePassword } />
      </ExampleConfig>
    );
  }
}


module.exports = [ ChangePasswordExample ];
