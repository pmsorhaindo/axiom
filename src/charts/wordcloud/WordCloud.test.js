import React from 'react';
import renderer from 'react-test-renderer';
import { WordCloud } from 'bw-axiom';

const getComponent = () =>
  renderer.create(
    <WordCloud height={ 256 } width={ 256 }/>
  );

describe('WordCloud', () => {
  it('renders with defaultProps', () => {
    const component = getComponent();
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
