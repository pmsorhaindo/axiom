import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Base } from 'bw-axiom';
import BulletBars from './BulletBars';
import ColumnChartBars from '../column-chart/ColumnChartBars';
import ColumnChartVisual from '../column-chart/ColumnChartVisual';
import ColumnChartRow from '../column-chart/ColumnChartRow';
import ColumnChartXAxis from '../column-chart/ColumnChartXAxis';
import ColumnChartXAxisLabel from '../column-chart/ColumnChartXAxisLabel';
import ColumnChartYAxis from '../column-chart/ColumnChartYAxis';
import './BulletChart.css';
import { formatData } from './utils';

export default class BulletChart extends Component {
  static propTypes = {
    /** A key for the chart */
    chartKey: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    /** The data to build the chart */
    data: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node.isRequired,
      values: PropTypes.object.isRequired,
    })).isRequired,
    /** Controls the direction of the bars */
    direction: PropTypes.string,
    /** Controls the height of the containing element */
    height: PropTypes.string.isRequired,
    /** Chart Y axis label */
    label: PropTypes.node,
    /** The offset value of the X-axis labels */
    labelColumnWidth: PropTypes.string,
    /** Controls which data set's bar label shows */
    labelIndex: PropTypes.number,
    /** Visibility control of the label above the each bar */
    showBarLabel: PropTypes.bool,
    /** Visibility control of the smaller label above the x-axis label*/
    showSubLabel: PropTypes.bool,
    /** Visibility control of the X-Axis label */
    showXAxisLabels: PropTypes.bool,
  };

  static defaultProps = {
    labelColumnWidth: '0rem',
    labelIndex: 0,
  };

  getLabelAlignment() {
    return this.props.direction === 'down' ? 'top' : 'bottom';
  }

  render() {
    const {
      chartKey,
      data,
      direction,
      height,
      label,
      labelColumnWidth,
      labelIndex,
      showBarLabel,
      showSubLabel,
      showXAxisLabels,
      ...rest
    } = this.props;

    const formattedData = formatData(chartKey, data);

    return (
      <Base { ...rest }
          className="ax-bullet-chart"
          style={ { height } }>
        <ColumnChartRow>
          { label &&
          <ColumnChartYAxis align={ this.getLabelAlignment() } yAxisWidth={ labelColumnWidth }>
            { label }
          </ColumnChartYAxis>
          }
          <ColumnChartVisual>
            { formattedData.map(({ values, label, subLabel }, index) =>
              <ColumnChartBars key={ index }>
                <BulletBars
                    barLabel={ values[labelIndex] && values[labelIndex].valueLabel }
                    direction={ direction }
                    label={ showSubLabel && subLabel }
                    showBarLabel={ showBarLabel }
                    values={ values }>
                </BulletBars>
              </ColumnChartBars>
            ) }
          </ColumnChartVisual>
        </ColumnChartRow>
        { showXAxisLabels && <ColumnChartXAxis labelColumnWidth={ labelColumnWidth }>
          { formattedData.map(({ label }, index) =>
            <ColumnChartXAxisLabel key={ index }>
              { label }
            </ColumnChartXAxisLabel>
          ) }
        </ColumnChartXAxis> }
      </Base>
    );
  }
}
