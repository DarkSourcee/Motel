import React from 'react';
import Sidebar from './components/SideBar/Sidebar';
import CardComponent from './components/Card/CardComponent';
import CardSuites from './components/CardSuites/CardSuites';
import CardLegend from './components/CardLegend/CardLegend';

const App = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <CardComponent />
        <div className="mb-4"></div>
        <CardSuites />
        <CardLegend />
      </div>
    </div>
  );
};

export default App;
