import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextInput from '../../components/form/TextInput';
import Validate from '../../components/validate/Validate';
import t from '../../utils/locales';

export default class CurrentPasswordInput extends Component {
  static contextTypes = {
    axiomLanguage: PropTypes.string,
  };

  static propTypes = {
    invalid: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const { axiomLanguage } = this.context;
    const { invalid, value, ...rest } = this.props;

    return (
      <Validate required value={ value }>
        { (validationValid) =>
          <TextInput { ...rest }
              invalid={ invalid || !validationValid }
              label={ t(axiomLanguage, 'enter-current-password') }
              space="x6"
              type="password"
              value={ value } />
        }
      </Validate>
    );
  }
}
