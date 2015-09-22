import { UPDATE_DATA, FILTER_DATA, QUEUE_NEW_FILTER, UPDATE_FILTERS } from '../actions';
import { updateData, filterData } from './data';
import { queueNewFilter, updateFilters } from './filters';

export default function reducer(state, action) {
  switch (action.type) {
    case UPDATE_DATA:
      return updateData(state, action);
    case FILTER_DATA:
      return filterData(state, action);
    case QUEUE_NEW_FILTER:
      return queueNewFilter(state, action);
    case UPDATE_FILTERS:
      return updateFilters(state, action);
    default:
      return state;
  }
}
