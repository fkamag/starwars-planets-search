import React from 'react';
import FilterByName from '../components/FilterByName';
import FilterByNumber from '../components/FilterByNumber';
import Table from '../components/Table';

import projectIntro from '../images/projectIntro.gif';

function Page() {
  return (
    <div className="App-header">
      <img className="logo" src={ projectIntro } alt="logo" />
      <FilterByName />
      <FilterByNumber />
      <Table />
    </div>
  );
}

export default Page;
