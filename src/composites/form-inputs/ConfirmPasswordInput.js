import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextInput from '../../components/form/TextInput';
import Validate from '../../components/validate/Validate';
import t from '../../utils/locales';

export default class ConfirmPasswordInput extends Component {
  static contextTypes = {
    axiomLanguage: PropTypes.string,
  };

  static propTypes = {
    passwordValue: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const { axiomLanguage } = this.context;
    const { passwordValue, value, ...rest } = this.props;

    return (
      <Validate
          error={ () => t(axiomLanguage, 'confirmation-doesnt-match') }
          patterns={ [(value) => value === passwordValue] }
          required
          value={ value }>
        { (valid) =>
          <TextInput { ...rest }
              invalid={ !valid }
              label={ t(axiomLanguage, 'confirm-new-password') }
              space="x6"
              type="password"
              value={ value } />
        }
      </Validate>
    );
  }
}
