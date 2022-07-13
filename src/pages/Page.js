import React, { useContext } from 'react';
import Table from '../components/Table';
import MyContext from '../context/MyContext';
import projectIntro from '../images/projectIntro.gif';

function Page() {
  const value = useContext(MyContext);
  console.log(value);
  return (
    <div className="App-header">
      <img className="logo" src={ projectIntro } alt="logo" />
      <input type="text" placeholder="Faça sua busca aqui" />
      <Table />
    </div>
  );
}

export default Page;
