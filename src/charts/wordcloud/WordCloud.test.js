import React from 'react';
import renderer from 'react-test-renderer';
import { WordCloud } from 'bw-axiom';

function getComponent(props = { words: [] }) {
  return renderer.create(
    <WordCloud { ...props }/>
  );
}

describe('WordCloud', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
