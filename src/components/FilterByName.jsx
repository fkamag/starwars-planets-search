import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function FilterByName() {
  const { name, setName } = useContext(MyContext);

  return (
    <input
      type="text"
      placeholder="Faça sua busca aqui"
      data-testid="name-filter"
      value={ name }
      onChange={ (event) => setName(event.target.value) }
    />
  );
}

export default FilterByName;
