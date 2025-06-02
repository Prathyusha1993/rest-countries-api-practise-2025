import { useState } from 'react';
import CountryList from './components/CountryList';
import './App.css';
import ListofCountries from './components/withoutBootstrapComponents/ListofCountries';

function App() {

  return (
    <>
      <h1>Rest Countries</h1>
      {/* <CountryList /> */}
      <ListofCountries />
    </>
  )
}

export default App;