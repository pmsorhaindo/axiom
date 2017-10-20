import PropTypes from 'prop-types';
import { Component } from 'react';

const getRequiredState = ({ required, value }) =>
  !required || (
    value !== undefined &&
    value !== null &&
    (typeof value !== 'string' || value.trim() !== '')
  );

const getPatternsState = ({ patterns, value }, allValues) =>
  Array.isArray(patterns) ? patterns.filter((pattern) =>
    (pattern instanceof RegExp && !pattern.test(value)) ||
    typeof pattern === 'function' && !pattern(value, allValues)
  ) : [];

export default class Validator extends Component {
  static propTypes = {
    /**
     * Function that returns React.node type and is provided with information
     * of the overall validity of all the child Validate's state.
     *
     * @param {function} getUpdatedValidation Returns a boolean of the overall
     * validity.
     * @param {string} error Error message, either for the overall required
     * invalidation, or provided by an individual Validate component.
     */
    children: PropTypes.func.isRequired,
    /** Error to output when required fields have not been met */
    requiredError: PropTypes.string,
  };

  static childContextTypes = {
    getValidity: PropTypes.func.isRequired,
    checkPatternMet: PropTypes.func.isRequired,
    checkRequiredMet: PropTypes.func.isRequired,
    registerValidate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._validationGetters = [];
    this.getUpdatedValidation = this.getUpdatedValidation.bind(this);
    this.getValidity = this.getValidity.bind(this);
    this.checkPatternMet = this.checkPatternMet.bind(this);
    this.checkRequiredMet = this.checkRequiredMet.bind(this);
    this.registerValidate = this.registerValidate.bind(this);
    this.state = {
      error: null,
      validated: false,
    };
  }

  getChildContext() {
    return {
      getValidity: this.getValidity,
      checkPatternMet: this.checkPatternMet,
      checkRequiredMet: this.checkRequiredMet,
      registerValidate: this.registerValidate,
    };
  }

  registerValidate(validationGetter) {
    this._validationGetters.push(validationGetter);
    this.setState({ invalidationIndex: this.getFirstInvalidIndex() });
    return this._validationGetters.length - 1;
  }

  getFirstInvalidIndex() {
    if (!this.getOverallRequiredValidity()) return -1;

    const invalidations = this.getAllInvalidations();
    for (let i = 0; i < invalidations.length; i++) {
      if (invalidations[i].length > 0) return i;
    }
    return -1;
  }

  getValidity(index) {
    const { validated, invalidationIndex } = this.state;

    if (!validated) {
      return true;
    }

    if (!this.getOverallRequiredValidity()) {
      return this.checkRequiredMet(index);
    }

    if (index !== invalidationIndex) {
      return true;
    }

    return !this.getInvalidations(index).length;
  }

  getErrorMessage(index) {
    if (!this.getOverallRequiredValidity()) {
      return this.props.requiredError;
    }

    if (index !== -1) {
      const { error } = this._validationGetters[index]();
      if (error) return error(this.getInvalidations(index));
    }

    return null;
  }

  getInvalidations(index) {
    return getPatternsState(this._validationGetters[index]());
  }

  getAllInvalidations() {
    return this._validationGetters.map((_, index) => this.getInvalidations(index));
  }

  getOverallRequiredValidity() {
    return this._validationGetters.every((_, index) => this.checkRequiredMet(index));
  }

  getOverallValidity() {
    return this.getOverallRequiredValidity() && this.getFirstInvalidIndex() === -1;
  }

  checkPatternMet(index, metPattern) {
    return this.getInvalidations(index).indexOf(metPattern) === -1;
  }

  checkRequiredMet(index) {
    return getRequiredState(this._validationGetters[index]());
  }

  getUpdatedValidation() {
    const invalidationIndex = this.getFirstInvalidIndex();

    this.setState({
      error: this.getErrorMessage(invalidationIndex),
      invalidationIndex,
      validated: true,
    });

    return this.getOverallValidity();
  }

  render() {
    const { error } = this.state;

    return this.props.children(
      this.getUpdatedValidation,
      error,
    );
  }
}
