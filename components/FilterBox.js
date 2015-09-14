import React from 'react';
import stampit from 'react-stampit';

export default stampit(React, {
  render() {
    const {
      categories,
      filters,
      onCheckboxClick,
      onUpdateClick,
      onResetClick,
    } = this.props;

    return (
      <div id='filterBox' >
        { categories.map((cat, index) => {
          return (
            <div key={index} >
              <input
                checked={filters.indexOf(cat) >= 0}
                onChange={onCheckboxClick}
                type='checkbox'
                value={cat}
              />
              {cat}
            </div>
          );
        })}
        <input
          onClick={onUpdateClick}
          type='button'
          value='Update'
        />
        <input
          onClick={onResetClick}
          type='button'
          value='Reset'
        />
      </div>
    );
  },
});
