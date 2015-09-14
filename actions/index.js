export const UPDATE_DATA = 'UPDATE_DATA';
export const FILTER_DATA = 'FILTER_DATA';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';

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

export function updateFilter(filter) {
  return {
    type: UPDATE_FILTER,
    filter,
  };
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  };
}
