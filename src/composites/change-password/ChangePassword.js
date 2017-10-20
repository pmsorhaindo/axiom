import PropTypes from 'prop-types';
import React, { Component } from 'react';
import omit from 'lodash.omit';
import Alert from '../../components/alert/Alert';
import Button from '../../components/button/Button';
import ButtonGroup from '../../components/button/ButtonGroup';
import ConfirmPasswordInput from '../form-inputs/ConfirmPasswordInput';
import CurrentPasswordInput from '../form-inputs/CurrentPasswordInput';
import Dialog from '../../components/dialog/Dialog';
import DialogBody from '../../components/dialog/DialogBody';
import DialogHeader from '../../components/dialog/DialogHeader';
import Form from '../../components/form/Form';
import Heading from '../../components/typography/Heading';
import NewPasswordInput from '../form-inputs/NewPasswordInput';
import Paragraph from '../../components/typography/Paragraph';
import Validator from '../../components/validate/Validator';
import atIds from '../../../at_ids';
import t from '../../utils/locales';

export default class ChangePassword extends Component {
  static contextTypes = {
    axiomLanguage: PropTypes.string,
  };

  static propTypes = {
    /** An error message that will be placed on the page */
    error: PropTypes.string,
    /** Allows error styles to be applied to the current password text box manually */
    isCurrentPasswordInvalid:  PropTypes.bool,
    /** Visibility toggle for the Dialog */
    isOpen: PropTypes.bool.isRequired,
    /** Toggles the disabled property on the submit button */
    isSubmitting: PropTypes.bool,
    /** Callback for closing the Dialog by clicking on the overlay */
    onRequestClose: PropTypes.func.isRequired,
    /** Submit handler that will be called with old and new password */
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isCurrentPasswordInvalid: false,
    isSubmitting: false,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      confirmPassword: '',
      currentPassword: '',
      internalError: false,
      newPassword: '',
    };
  }

  handleSubmit(event, getUpdatedValidation) {
    const { currentPassword, newPassword } = this.state;
    const isValid = getUpdatedValidation();

    event.preventDefault();

    if (isValid) {
      this.props.onSubmit({ currentPassword, newPassword });
    }
  }

  render() {
    const {
      error,
      isCurrentPasswordInvalid,
      isSubmitting,
      onRequestClose,
      ...rest
    } = this.props;
    const { confirmPassword, currentPassword, newPassword } = this.state;
    const { axiomLanguage } = this.context;

    return (
      <Validator requiredError={ t(axiomLanguage, 'complete-all-fields') }>
        { (getUpdatedValidation, validationError) =>
          <Dialog { ...omit(rest, ['onSubmit']) }
              onRequestClose={ onRequestClose }
              size="medium">
            <DialogHeader>
              <Heading textSize="headtitle">
                { t(axiomLanguage, 'change-password-title') }
              </Heading>
            </DialogHeader>

            { (validationError || error) && (
              <Alert type="error">
                <Paragraph data-ax-at={ atIds.ChangePassword.error }>
                  { validationError || error }
                </Paragraph>
              </Alert>
            ) }

            <DialogBody>
              <Form onSubmit={ (e) => this.handleSubmit(e, getUpdatedValidation) }>
                <CurrentPasswordInput
                    data-ax-at={ atIds.ChangePassword.currentPassword }
                    invalid={ isCurrentPasswordInvalid }
                    onChange={ (e) => this.setState({ currentPassword: e.target.value }) }
                    value={ currentPassword } />

                <NewPasswordInput
                    data-ax-at={ atIds.ChangePassword.newPassword }
                    onChange={ (e) => this.setState({ newPassword: e.target.value }) }
                    value={ newPassword } />

                <ConfirmPasswordInput
                    data-ax-at={ atIds.ChangePassword.confirmPassword }
                    onChange={ (e) => this.setState({ confirmPassword: e.target.value }) }
                    passwordValue={ newPassword }
                    value={ confirmPassword } />

                <ButtonGroup textRight>
                  <Button
                      data-ax-at={ atIds.ChangePassword.cancel }
                      onClick={ onRequestClose }
                      style="secondary"
                      type="button">
                    { t(axiomLanguage, 'cancel-button') }
                  </Button>
                  <Button
                      data-ax-at={ atIds.ChangePassword.submit }
                      disabled={ isSubmitting }
                      type="submit">
                    { t(axiomLanguage, 'change-password-button') }
                  </Button>
                </ButtonGroup>
              </Form>
            </DialogBody>
          </Dialog>
        }
      </Validator>
    );
  }
}
