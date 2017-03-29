import React, { Component } from 'react';
import { Example, Snippet } from 'style-guide';
import { WordCloud, Word } from 'bw-axiom';
import { wordArray } from './data';

export default class WordCloudExample extends Component {
  render() {
    return (
      <Example name="Word Cloud">
        <Snippet>
          <WordCloud
              height={ 600 }
              width={ 960 }>
            { wordArray.map((options, key) => <Word key={ key } { ...options } />) }
          </WordCloud>
        </Snippet>
      </Example>
    );
  }
}
