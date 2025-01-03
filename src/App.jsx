// import React, { useEffect } from 'react';
// import Sidebar from './components/SideBar/Sidebar';
// import CardComponent from './components/Card/CardComponent';
// import CardSuites from './components/CardSuites/CardSuites';
// import CardLegend from './components/CardLegend/CardLegend';

// const App = () => {
//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1 p-3">
//         <CardComponent />
//         <div className="mb-4"></div>
//         <CardSuites />
//         <CardLegend />
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import Sidebar from './components/SideBar/Sidebar';
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
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <CardComponent />
        <div className="mb-4"></div>
        <CardSuites />
        {/* Renderiza o CardLegend somente se não for dispositivo móvel */}
        {!isMobile && <CardLegend />}
      </div>
    </div>
  );
};

export default App;
