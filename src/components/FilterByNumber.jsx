import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function FilterByNumber() {
  const { filter, setFilter, optionsColumn, setOptionsColumn,
    filterByNumericValues, setFilterByNumericValues, optionsSort,
    order, setOrder,
  } = useContext(MyContext);

  const INITIAL_STATE = {
    columnValue: optionsColumn[0],
    comparisonValue: 'maior que',
    numberValue: 0,
  };

  useEffect(() => {
    setFilter(INITIAL_STATE);
  }, [optionsColumn]);

  function handleChange({ target: { id, value } }) {
    setFilter({
      ...filter,
      [id]: value,
    });
  }

  function handleClick() {
    setFilterByNumericValues([
      ...filterByNumericValues,
      {
        column: filter.columnValue,
        comparison: filter.comparisonValue,
        value: filter.numberValue,
      }]);
    setOptionsColumn(optionsColumn
      .filter((col) => col !== filter.columnValue));
  }

  function deleteFilter(event) {
    setFilterByNumericValues(filterByNumericValues
      .filter((fil) => fil.column !== event.target.value));
    setOptionsColumn([
      ...optionsColumn,
      event.target.value,
    ]);
  }

  function handleChangeSort({ target: { name, value } }) {
    setOrder({
      ...order,
      [name]: value,
      isSort: false,
    });
  }

  function handleClickSort() {
    setOrder({
      ...order,
      isSort: true,
    });
  }

  function removeFilters() {
    setFilterByNumericValues([]);
    setOptionsColumn(optionsSort);
    setOrder({
      ...order,
      isSort: false,
    });
  }

  return (
    <div>
      <div>
        <label htmlFor="columnValue">
          Column
          <select
            data-testid="column-filter"
            id="columnValue"
            value={ filter.columnValue }
            onChange={ handleChange }
          >
            {optionsColumn.map((option, index) => (
              <option value={ option } key={ index }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="comparisonValue">
          Operator
          <select
            data-testid="comparison-filter"
            id="comparisonValue"
            value={ filter.comparisonValue }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          id="numberValue"
          data-testid="value-filter"
          value={ filter.numberValue }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filter
        </button>
      </div>
      <div>
        { filterByNumericValues.length > 0 ? (
          filterByNumericValues.map((filt, index) => (
            <div key={ index } className="filterSelected" data-testid="filter">
              <span>{ filt.column }</span>
              <span>{ filt.comparison }</span>
              <span>{ filt.value }</span>
              <button
                type="button"
                onClick={ deleteFilter }
                value={ filt.column }
              >
                Excluir
              </button>
            </div>
          ))
        ) : <br />}
      </div>
      <div>
        <label htmlFor="column">
          Column
          <select
            data-testid="column-sort"
            id="column"
            name="column"
            value={ order.column }
            onChange={ handleChangeSort }
          >
            {optionsSort.map((option, index) => (
              <option value={ option } key={ index }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="sortAsc">
          <input
            type="radio"
            id="sortAsc"
            name="sort"
            data-testid="column-sort-input-asc"
            value="ASC"
            // checked
            onChange={ handleChangeSort }
          />
          Ascending Sort
        </label>
        <label htmlFor="sortDesc">
          <input
            type="radio"
            id="sortDesc"
            name="sort"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ handleChangeSort }
          />
          Descending Sort
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleClickSort }
        >
          Sort
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeFilters }
        >
          Remove all filters
        </button>
      </div>
    </div>
  );
}

export default FilterByNumber;
