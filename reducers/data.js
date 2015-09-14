export function updateData(state, action) {
  const data = action.data;

  return { ...state, data };
}

export function filterData(state, action) {
  const { filters, data, categories } = state;
  let filteredData = [];

  if (filters.length > 1 || !data[filters[0]]) {
    data.All.forEach(cat => {
      let value = cat.value;
      if (filters.indexOf(cat.label) < 0 && cat.value > 0) {
        value = 0;
      }

      filteredData.push({ ...cat, value });
    });
  } else if (filters.length === 1) {
    filteredData = data[filters[0]];
  }

  return { ...state, filteredData };
}
