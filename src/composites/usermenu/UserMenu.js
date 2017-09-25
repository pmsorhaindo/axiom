import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Avatar,
  Button,
  ButtonGroup,
  Context,
  ContextBox,
  Candytar,
  Dropdown,
  DropdownTarget,
  DropdownContent,
  Grid,
  GridCell,
  Heading,
  Link,
  Paragraph,
} from 'bw-axiom';

const stringToColor = (string) => (colors) =>  colors[
  string.split('').reduce((acc, val) =>acc + val.charCodeAt(), 0) % (colors.length - 1)
];

export default class UserMenu extends Component {
  static propTypes = {
    children: PropTypes.node,
    /** User email address */
    email: PropTypes.string.isRequired,
    /** User first name */
    firstName: PropTypes.string.isRequired,
    /** User image, if none provided it will default to a Candytar */
    imageSrc: PropTypes.string,
    /** User last name */
    lastName: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    /** Logout handler called when the sign out button is pressed */
    onLogout: PropTypes.func.isRequired,
  };

  render() {
    const { children, firstName, lastName, email, imageSrc, t, onLogout } = this.props;
    const userColorPicker = stringToColor(email);

    return (
      <Dropdown position="bottom">
        <DropdownTarget>
          <Link>
            <Avatar size="2rem" src={ imageSrc }>
              <Candytar picker={ userColorPicker } size="2rem" />
            </Avatar>
          </Link>
        </DropdownTarget>

        <DropdownContent>
          <Context width="auto">
            <ContextBox>
              <Grid gutters="large" responsive={ false } verticalAlign="middle">
                <GridCell fill>
                  <Heading space="x0" textSize="headtitle">{ firstName } { lastName }</Heading>
                  <Paragraph space="x0" textColor="subtle">{ email }</Paragraph>
                  <ButtonGroup space="x4">
                    <Button data-tid="logout" onClick={ onLogout }>{ t('sign-out') }</Button>
                  </ButtonGroup>
                </GridCell>

                <GridCell shrink>
                  <Avatar size="4.5rem" src={ imageSrc }>
                    <Candytar picker={ userColorPicker } size="4.5rem" />
                  </Avatar>
                </GridCell>
              </Grid>
            </ContextBox>

            { children }
          </Context>
        </DropdownContent>
      </Dropdown>
    );
  }
}
