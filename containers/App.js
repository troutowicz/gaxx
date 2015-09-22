import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import * as actions from '../actions';

function mapStateToProps(state) {
  return {
    categories: state.categories,
    filters: state.queuedFilters,
    filteredData: state.filteredData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
