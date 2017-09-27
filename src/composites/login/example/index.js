import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ExampleConfig } from 'style-guide';
import { Login } from 'bw-axiom';
import { translate as t } from '../../../utils/locales';

class LoginExample extends Component {
  static contextTypes = {
    axiomLanguage: PropTypes.oneOf(['en', 'de', 'es', 'fr']),
  };

  static propTypes = {
    components: PropTypes.shape({
      Login: PropTypes.object,
    }).isRequired,
  };

  handleSubmit({ username, password }) {
    window.alert(`Login attempted with username '${username}' and password '${password}'`);
  }

  render() {
    const { components } = this.props;
    const { axiomLanguage } = this.context;
    const propTypes = {
      Login: components.Login,
    };

    const initialProps = {
      Login: {
        application: 'Axiom',
        backgroundImage: 'assets/axiom-bg.jpg',
        error: t(axiomLanguage, 'sorry-password-error'),
        onSubmit: this.handleSubmit.bind(this),
        theme: 'dark',
      },
    };

    return (
      <ExampleConfig initialProps={ initialProps } propTypes={ propTypes }>
        <div snippetIgnore style={ { height: '30rem' } }>
          <Login { ...initialProps.Login } />
        </div>
      </ExampleConfig>
    );
  }
}

module.exports = [ LoginExample ];
