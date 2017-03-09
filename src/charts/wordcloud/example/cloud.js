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
              scaleX={ 1.0101009607315063 }
              scaleY={ 1.0101009607315063 }
              translateX={ 480 }
              translateY={ 300 }
              width={ 960 }>
            { wordArray.map((options, key) => <Word key={ key } { ...options } />) }
          </WordCloud>
        </Snippet>
      </Example>
    );
  }
}
