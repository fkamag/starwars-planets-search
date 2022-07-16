import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);

  useEffect(() => {
    const getListPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const result = await response.json();
      const data = result.results;
      data.forEach((planet) => {
        delete planet.residents;
      });
      console.log(data);
      setListPlanets(data);
    };
    getListPlanets();
  }, []);

  const context = {
    listPlanets,
    setListPlanets,
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
