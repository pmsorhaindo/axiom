import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Validate extends Component {
  static contextTypes = {
    getValidity: PropTypes.func.isRequired,
    checkPatternMet: PropTypes.func.isRequired,
    checkRequiredMet: PropTypes.func.isRequired,
    registerValidate: PropTypes.func.isRequired,
  };

  static propTypes = {
    /**
     * Function that returns React.node type and is provided with information
     * of the validity of the inputs state.
     *
     * @param {bool} isValid Inline validity state for that input
     * @param {bool} hasMetRequired Returns the current required validity
     * @param {function} checkPatternMet Takes a pattern and returns the
     * validity of that pattern
     */
    children: PropTypes.func.isRequired,
    /**
     * Function that given the inputs invalidations, returns an error
     * message which is given by the top level Validator component.
     */
    error: PropTypes.func,
    /**
     * Array of patterns to be run against this input.
     */
    patterns: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func.isRequired,
        PropTypes.instanceOf(RegExp).isRequired,
      ]).isRequired,
    ),
    /** If this is a required field */
    required: PropTypes.bool,
    /** Current value to run against the validations */
    value: PropTypes.any,
  };

  componentWillMount() {
    const { checkPatternMet, registerValidate } = this.context;
    const index = registerValidate(() => ({
      error: this.props.error,
      patterns: this.props.patterns,
      required: this.props.required,
      value: this.props.value,
    }));

    this.setState({ index });
    this.checkPatternMet = (pattern) => checkPatternMet(index, pattern);
  }

  render() {
    const { index } = this.state;
    const { getValidity, checkRequiredMet } = this.context;

    return this.props.children(
      getValidity(index),
      checkRequiredMet(index),
      this.checkPatternMet,
    );
  }
}
