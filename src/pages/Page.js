import React from 'react';
import FilterByName from '../components/FilterByName';
import Table from '../components/Table';

import projectIntro from '../images/projectIntro.gif';

function Page() {
  return (
    <div className="App-header">
      <img className="logo" src={ projectIntro } alt="logo" />
      <FilterByName />
      <Table />
    </div>
  );
}

export default Page;
