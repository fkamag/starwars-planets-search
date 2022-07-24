import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const INITIAL_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);
  const [optionsColumn, setOptionsColumn] = useState(INITIAL_OPTIONS);
  const [columnValue, setColumnValue] = useState(['population']);
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [numberValue, setNumberValue] = useState(0);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState({ filter: {} });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [optionsSort, setOptionsSort] = useState(INITIAL_OPTIONS);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  useEffect(() => {
    const getListPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();
      const data = result.results;
      data.forEach((planet) => {
        delete planet.residents;
      });
      setListPlanets(data);
    };
    getListPlanets();
  }, []);

  const context = {
    listPlanets,
    setListPlanets,
    optionsColumn,
    setOptionsColumn,
    columnValue,
    setColumnValue,
    comparisonValue,
    setComparisonValue,
    numberValue,
    setNumberValue,
    name,
    setName,
    filter,
    setFilter,
    filterByNumericValues,
    setFilterByNumericValues,
    optionsSort,
    setOptionsSort,
    order,
    setOrder,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
