import React from 'react';
import './CardLegend.css'; // Arquivo CSS para estilos personalizados

const CardLegend = () => {
  const legendItems = [
    { cor: '#f0f0f0', texto: 'Disponível' },
    { cor: '#4BA151', texto: 'PERIODO' },
    { cor: '#EB8C11', texto: 'DIARIA' },
    { cor: '#5CACEE', texto: 'PERNOITE' },
    { cor: '#F0E68C', texto: 'PROMOCIONAL' },
    { cor: '#F194A4', texto: 'MAU CLIENTE' },
    { cor: '#3C3C3C', texto: 'SUJA' },
    { cor: '#E14D4D', texto: 'FAXINA' },
    { cor: '#E14D4D', texto: 'MANUTENÇÃO' },
    { cor: '#5A083D', texto: 'RESERVA ON-LINE' },
    { cor: '#E14D4D', texto: 'CLIENTE NA GARAGEM' },
    { cor: '#BDBD1D', texto: 'EM ARRUMAÇÃO' },
    { cor: '#865456', texto: 'À REVISAR' },
    { cor: '#1e5e1e', texto: 'REVISANDO' },
    { cor: '#8b795e', texto: 'CIGARRO' }
  ];

  return (
    <div className="card-legend-container">
      <h3 className="legend-title">Legenda</h3>
      <div className="legend-grid">
        {legendItems.map((item, index) => (
          <div className="legend-item" key={index}>
            <div
              className="legend-color-box"
              style={{ backgroundColor: item.cor }}
            />
            <span className="legend-text">{item.texto}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardLegend;
