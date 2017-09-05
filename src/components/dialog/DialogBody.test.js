import React from 'react';
import renderer from 'react-test-renderer';
import { DialogBody } from 'bw-axiom';

const getComponent = (props = {}) =>
  renderer.create(
    <DialogBody { ...props }>
      Lorem ipsum
    </DialogBody>
  );

describe('DialogBody', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
