export function queueNewFilter(state, action) {
  const queuedFilters = [...state.queuedFilters],
      index = queuedFilters.indexOf(action.filter);

  if (index >= 0) {
    queuedFilters.splice(index, 1);
  } else {
    queuedFilters.push(action.filter);
  }

  return { ...state, queuedFilters };
}

export function updateFilters(state, action) {
  const queuedFilters = action.reset || !state.queuedFilters.length
    ? [...state.categories]
    : [...state.queuedFilters];
  const filters = [...queuedFilters];

  return { ...state, filters, queuedFilters };
}
