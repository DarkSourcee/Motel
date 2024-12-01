import React from 'react';

const CardLegend = () => {
  const legendItems = [
    { tipo: 'PERIODO', cor: '#4BA151', texto: 'Período - Disponível' },
    { tipo: 'DIARIA', cor: '#EB8C11', texto: 'Diária - Disponível' },
    { tipo: 'PERNOITE', cor: '#5CACEE', texto: 'Pernoite - Disponível' },
    { tipo: 'PROMOCIONAL', cor: '#0059A0', texto: 'Promocional - Disponível' },
    { tipo: 'EA', cor: '#F0E68C', texto: 'Em Análise' }
  ];

  return (
    <div className="container mt-4">
      <h3>Legenda</h3>
      <div className="row">
        {legendItems.map((item, index) => (
          <div className="col-md-2 mb-2" key={index}>
            <div className="d-flex align-items-center">
              <div 
                style={{
                  width: '20px', 
                  height: '20px', 
                  backgroundColor: item.cor, 
                  marginRight: '10px',
                  borderRadius: '3px'
                }}
              />
              <p style={{ margin: 0 }}>{item.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardLegend;
