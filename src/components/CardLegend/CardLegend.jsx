import React from 'react';

const CardLegend = () => {
  const legendItems = [
    {cor: '#f0f0f0', texto: 'Disponível' },
    {cor: '#4BA151', texto: 'PERIODO - O' },
    {cor: '#EB8C11', texto: 'DIARIA  - O' },
    {cor: '#5CACEE', texto: 'PERNOITE - O' },
    {cor: '#F0E68C', texto: 'PROMOCIONAL - O' },
    {cor: '#F194A4', texto: 'MAU CLIENTE - MC' },
    {cor: '#3C3C3C', texto: 'SUJA  - EA' },
    {cor: '#E14D4D', texto: 'FAXINA - F' },
    {cor: '#E14D4D', texto: 'MANUTENÇÃO - M' },
    {cor: '#5A083D', texto: 'RESERVA ON-LINE - G' },
    {cor: '#E14D4D', texto: 'CLIENTE NA GARAGEM - GE, GA' },
    {cor: '#BDBD1D', texto: 'EM ARRUMAÇÃO - D' },
    {cor: '#865456', texto: 'À REVISAR - AR' },
    {cor: '#1e5e1e', texto: 'REVISANDO - RA' },
    {cor: '#8b795e', texto: 'CIGARRO(MAU CHEIRO) - C' }
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
