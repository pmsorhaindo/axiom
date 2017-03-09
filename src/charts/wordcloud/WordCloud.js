import React, { Component, PropTypes } from 'react';
import { Base } from 'bw-axiom';

const DEFAULT_SIZE = 256;

export default class WordCloud extends Component {
  static propTypes = {
    children: PropTypes.node,
    height: PropTypes.number,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    height: DEFAULT_SIZE,
    scaleX: 1,
    scaleY: 1,
    translateX: 0,
    translateY: 0,
    width: DEFAULT_SIZE,
  };

  render() {
    const {
      children,
      height,
      scaleX,
      scaleY,
      translateX,
      translateY,
      width,
    } = this.props;
    const transform = `translate(${translateX},${translateY})scale(${scaleX},${scaleY})`;
    return (
      <Base>
        <svg
            version="1.1"
            viewBox={ `0 0 ${width} ${height}` }>
          <g transform={ transform }>
            { children }
          </g>
        </svg>
      </Base>
    );
  }
}
