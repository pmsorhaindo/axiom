import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Form,
  Grid,
  GridCell,
  Animicon,
  List,
  ListItem,
  TextInput,
} from 'bw-axiom';
import ChangePasswordControls from './ChangePasswordControls';
import atIds from '../../../at_ids';

export default class ChangePasswordForm extends Component {

  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    isSubmitting: PropTypes.bool.isRequired,
    rules: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      pattern: PropTypes.object.isRequired,
    })),
    t: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handlePasswordChange(key, event) {
    this.setState({ [key]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { currentPassword, newPassword } = this.state;

    onSubmit({ currentPassword, newPassword });
  }

  render() {
    const {
      onRequestClose,
      onSubmit,
      rules,
      isSubmitting,
      t,
    } = this.props;
    const { currentPassword, newPassword, confirmPassword } = this.state;

    const validatedRules = rules.map(rule => ({
      ...rule,
      valid: rule.pattern.test(newPassword),
    }));

    const allValid = validatedRules.every(({ valid }) => valid === true);
    const passwordsMatch = currentPassword === newPassword;
    const currentPasswordValid = currentPassword.length > 0;
    const newPasswordValid = allValid && !passwordsMatch && newPassword.length > 0;
    const confirmPasswordValid = newPasswordValid && newPassword === confirmPassword;
    const colRules = [
      validatedRules.filter((_, idx) => idx < validatedRules.length / 2),
      validatedRules.filter((_, idx) => idx >= validatedRules.length / 2),
    ];

    return (
      <Form onSubmit={ onSubmit }>
        <TextInput
            data-ax-at={ atIds.ChangePassword.currentPassword }
            label={ t('enter-current-password') }
            onChange={ e => this.handlePasswordChange('currentPassword', e) }
            space="x6"
            type="password"
            value={ currentPassword } />

        <TextInput
            data-ax-at={ atIds.ChangePassword.newPassword }
            label={ t('create-new-password') }
            onChange={ e => this.handlePasswordChange('newPassword', e) }
            space="x2"
            type="password"
            valid={ newPasswordValid }
            value={ newPassword } />

        <Grid horizontalGutters="large" responsive={ false } space="x4" verticalGutters="tiny">
          { colRules.map((validatedRules, id) => (
            <GridCell key={ id } shrink>
              <List style="none" textColor="subtle">
                { validatedRules.map(({ label, valid }, id) => (
                  <ListItem key={ id } space="x2">
                    { t(label) }
                    <Animicon
                        inline
                        isIn={ valid }
                        name="tick"
                        spaceLeft="x1"
                        textColor="success" />
                  </ListItem>
                ) ) }
              </List>
            </GridCell>
          ) ) }
        </Grid>

        <TextInput
            data-ax-at={ atIds.ChangePassword.confirmPassword }
            id="confirm-password"
            label={ t('confirm-new-password') }
            onChange={ e => this.handlePasswordChange('confirmPassword', e) }
            space="x6"
            type="password"
            valid={ confirmPasswordValid }
            value={ confirmPassword } />

        <ChangePasswordControls
            isSubmitDisabled={ !confirmPasswordValid || !currentPasswordValid || isSubmitting }
            onCancel={ onRequestClose }
            onSubmit={ onSubmit }
            t={ t } />
      </Form>
    );
  }
}
