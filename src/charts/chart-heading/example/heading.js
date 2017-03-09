import React, { Component } from 'react';
import { Example, Snippet } from 'style-guide';
import { ChartHeading } from 'bw-axiom';

export default class ChartHeadingExample extends Component {
  render() {
    return (
      <Example name="Chart Heading">
        <Snippet>
          <ChartHeading>
            Chart Heading
          </ChartHeading>
        </Snippet>
      </Example>
    );
  }
}

