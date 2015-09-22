export const UPDATE_DATA = 'UPDATE_DATA';
export const FILTER_DATA = 'FILTER_DATA';
export const QUEUE_NEW_FILTER = 'QUEUE_NEW_FILTER';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';

export function updateData(data) {
  return {
    type: UPDATE_DATA,
    data,
  };
}

export function filterData() {
  return {
    type: FILTER_DATA,
  }
}

export function queueNewFilter(filter) {
  return {
    type: QUEUE_NEW_FILTER,
    filter,
  };
}

export function updateFilters(reset = false) {
  return {
    type: UPDATE_FILTERS,
    reset,
  };
}
