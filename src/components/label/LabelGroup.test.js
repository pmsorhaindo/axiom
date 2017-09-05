import React from 'react';
import renderer from 'react-test-renderer';
import { LabelGroup, Label } from 'bw-axiom';

const getComponent = (props = {}) =>
  renderer.create(
    <LabelGroup { ...props }>
      <Label>Lorem ipsum</Label>
    </LabelGroup>
  );

describe('LabelGroup', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
