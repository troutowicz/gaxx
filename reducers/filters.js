export function updateFilter(state, action) {
  const filters = [...state.filters],
      index = filters.indexOf(action.filter);

  if (index >= 0) {
    filters.splice(index, 1);
  } else {
    filters.push(action.filter);
  }

  return { ...state, filters };
}

export function resetFilters(state, action) {
  const filters = [...state.categories];

  return { ...state, filters };
}
