import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const { listPlanets, name, filterByNumericValues, order } = useContext(MyContext);
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

  listFiltered = listFiltered.sort((a, b) => a.name.localeCompare(b.name));

  if (order.isSort) {
    // console.log(listFiltered);
    if (order.sort === 'ASC') {
      const numberCompare = -1;
      listFiltered = listFiltered.sort((a, b) => {
        if (a[order.column] === 'unknown') return 1;
        if (b[order.column] === 'unknown') return numberCompare;
        return Number(a[order.column]) - Number(b[order.column]);
      });
    }
    if (order.sort === 'DESC') {
      const numberCompare = -1;
      listFiltered = listFiltered.sort((a, b) => {
        if (a[order.column] === 'unknown') return 1;
        if (b[order.column] === 'unknown') return numberCompare;
        return Number(b[order.column]) - Number(a[order.column]);
      });
    }
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
                <td data-testid="planet-name">{planet.name}</td>
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
