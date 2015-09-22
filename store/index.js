import { createStore } from 'redux';
import reducer from '../reducers';

const categories = [ 'Movies', 'TV', 'Music', 'Games', 'Apps', 'Books', 'XXX', 'Dox', 'Unknown' ];

export default createStore(reducer, {
  categories,
  data: {},
  filteredData: [],
  filters: categories,
  queuedFilters: categories,
  redraw: false,
});
