import React, { useState, useEffect } from 'react';
import Sidebar from './components/SideBar/Sidebar';
import CardComponent from './components/Card/CardComponent';
import CardSuites from './components/CardSuites/CardSuites';
import CardLegend from './components/CardLegend/CardLegend';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const interval = 30000;

  const fetchData = async () => {
    try {
      const response = await axios.get('http://motelexotico.ddns.net:1011/info');
      setData(response.data);

      const response2 = await axios.get('http://motelexotico.ddns.net:1011/caixaatual');
      setData2(response2.data);

      setLastUpdated(new Date());
      setTimeRemaining(interval);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1000;
        } else {
          fetchData();
          return interval;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        {lastUpdated && (
          <div className='p-2'>
            <p>Última atualização: {lastUpdated.toLocaleString()}</p>
            <p>Tempo restante para próxima atualização: {Math.floor(timeRemaining / 1000)}s</p>
          </div>
        )}
        <CardComponent data={data} />
        <div className="mb-4"></div>
        <CardSuites data={data2} />
        <CardLegend data={data2} />
      </div>
    </div>
  );
};

export default App;
