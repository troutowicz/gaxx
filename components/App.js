import io from 'socket.io-client';
import React from 'react';
import stampit from 'react-stampit';

import FilterBox from './FilterBox';
import Chart from './Chart';

export default stampit(React, {
  state: {
    redraw: true,
  },

  componentDidMount() {
    io().on('update', (data) => {
      this.props.updateData(data);
      this.props.filterData();
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.filteredData.length === this.props.filteredData.length) {
      this.setState({ redraw: false });
    } else {
      this.setState({ redraw: true });
    }
  },

  _onCheckboxClick(e) {
    this.props.queueNewFilter(e.target.value);
  },

  _onUpdateClick() {
    this.props.updateFilters();
    this.props.filterData();
  },

  _onResetClick() {
    this.props.updateFilters(true);
    this.props.filterData();
  },

  render() {
    return (
      <div>
        <span id='title'>gaxx</span>
        <FilterBox
          categories={this.props.categories}
          filters={this.props.filters}
          onCheckboxClick={e => this._onCheckboxClick(e)}
          onResetClick={() => this._onResetClick()}
          onUpdateClick={() => this._onUpdateClick()}
        />
        <Chart
          data={this.props.filteredData}
          redraw={this.state.redraw}
          ref='chart'
        />
        <div id='legend'></div>
      </div>
    );
  },
});
