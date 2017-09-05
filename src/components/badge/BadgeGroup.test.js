import React from 'react';
import renderer from 'react-test-renderer';
import { BadgeGroup, Badge } from 'bw-axiom';

const getComponent = (props = {}) =>
  renderer.create(
    <BadgeGroup { ...props }>
      <Badge>Lorem ipsum</Badge>
    </BadgeGroup>
  );

describe('BadgeGroup', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
