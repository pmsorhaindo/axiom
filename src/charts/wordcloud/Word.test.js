import React from 'react';
import renderer from 'react-test-renderer';
import { Word } from 'bw-axiom';

function getComponent(props = { x: 0, y: 0 }) {
  return renderer.create(
    <Word { ...props } />
  );
}

describe('Word', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
