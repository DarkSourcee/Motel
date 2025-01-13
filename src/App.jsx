import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import CardComponent from './components/Card/CardComponent';
import CardSuites from './components/CardSuites/CardSuites';
import CardLegend from './components/CardLegend/CardLegend';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Verifica se é um dispositivo móvel
    };

    // Define o estado inicial e adiciona um event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove o listener ao desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex">
      <div className="flex-grow-1 custom-padding">
        <Navbar />
        <CardComponent />
        <div className="mb-2"></div>
        <CardSuites />
        {/* Renderiza o CardLegend somente se não for dispositivo móvel */}
        {!isMobile && <CardLegend />}
      </div>
    </div>
  );
};

export default App;
