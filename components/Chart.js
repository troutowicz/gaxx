import React from 'react';
import stampit from 'react-stampit';
import { Doughnut } from 'react-chartjs';

export default stampit(React, {
  componentDidMount() {
    // this._renderLegend();
  },

  componentDidUpdate() {
    // this._renderLegend();
  },

  getChart() {
    return this.refs.chart.getChart();
  },

  _renderLegend() {
    document.getElementById('legend').innerHTML = this.refs.chart.generateLegend();
  },

  render() {
    let options = {
      responsive: true,
      segmentStrokeColor: '#F2F2F2',
      segmentStrokeWidth : 1,
      percentageInnerCutout: 55,
      animationSteps: 50,
      animationEasing: undefined,
    };

    return (
      <Doughnut
        data={this.props.data}
        height='100'
        id='chart'
        options={options}
        redraw={this.props.redraw}
        ref='chart'
      />
    );
  },
});
