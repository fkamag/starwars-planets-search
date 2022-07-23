import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { listPlanets, name, filterByNumericValues } = useContext(MyContext);
  let listFiltered = listPlanets
    .filter((planet) => planet.name.includes(name));
  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        listFiltered = listFiltered
          .filter((planet) => Number(planet[filter.column]) > Number(filter.value));
      }
      if (filter.comparison === 'menor que') {
        listFiltered = listFiltered
          .filter((planet) => Number(planet[filter.column]) < Number(filter.value));
      }
      if (filter.comparison === 'igual a') {
        listFiltered = listFiltered
          .filter((planet) => Number(planet[filter.column]) === Number(filter.value));
      }
    });
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            listFiltered.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
