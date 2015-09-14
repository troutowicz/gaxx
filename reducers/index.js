import { UPDATE_DATA, FILTER_DATA, UPDATE_FILTER, RESET_FILTERS } from '../actions';
import { updateData, filterData } from './data';
import { updateFilter, resetFilters } from './filters';

export default function reducer(state, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return updateData(state, action);
    case FILTER_DATA:
      return filterData(state, action);
    case UPDATE_FILTER:
      return updateFilter(state, action);
    case RESET_FILTERS:
      return resetFilters(state, action);
    default:
      return state;
  }
}
