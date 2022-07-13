import React from 'react';
import Provider from './context/Provider';
import './App.css';
import Page from './pages/Page';

function App() {
  return (
    <Provider>
      <Page />
    </Provider>
  );
}

export default App;
