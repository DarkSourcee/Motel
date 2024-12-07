import React from 'react';
import './CardLegend.css'; // Arquivo CSS para estilos personalizados

const CardLegend = () => {
  const legendItems = [
    { cor: '#f0f0f0', texto: 'Disponível' },
    { cor: '#4BA151', texto: 'PERIODO' },
    { cor: '#EB8C11', texto: 'DIARIA' },
    { cor: '#5CACEE', texto: 'PERNOITE' },
    { cor: '#0059A0', texto: 'PROMOCIONAL' },
    { cor: '#F194A4', texto: 'MAU CLIENTE' },
    { cor: '#3C3C3C', texto: 'SUJA' },
    { cor: '#E14D4D', texto: 'FAXINA' },
    { cor: '#E14D4D', texto: 'MANUTENÇÃO' },
    { cor: '#5A083D', texto: 'RESERVA ON-LINE' },
    { cor: '#D7A3AC', texto: 'CLIENTE NA GARAGEM' },
    { cor: '#BDBD1D', texto: 'EM ARRUMAÇÃO' },
    { cor: '#865456', texto: 'À REVISAR' },
    { cor: '#1e5e1e', texto: 'REVISANDO' },
    { cor: '#8b795e', texto: 'CIGARRO' }
  ];

  const getBackgroundColor = (flag, tipo) => {
    let background = "#f0f0f0"; // Cor padrão
    let color = "#000000"; // Texto padrão

    if (flag === "O") {
      switch (tipo) {
        case "PERIODO":
          background = "linear-gradient(90deg, #4BA151, #5CE52B)";
          color = "#FFFFFF";
          break;
        case "DIARIA":
          background = "linear-gradient(90deg, #EB8C11, #EDB123)";
          color = "#FFFFFF";
          break;
        case "PERNOITE":
          background = "linear-gradient(90deg, #5CACEE, #9DCDF5)";
          color = "#FFFFFF";
          break;
        case "PROMOCIONAL":
          background = "linear-gradient(90deg, #0059A0, #C8C8E9)";
          color = "#FFFFFF";
          break;
        case "MC": // MAU CLIENTE
          background = "linear-gradient(90deg, #F194A4, #E74F69)";
          color = "#FFFFFF";
          break;
        default:
          background = "#f0f0f0"; // cor de fundo padrão
          color = "#000000"; // texto preto para fundo claro
      }
    } else if (flag === "EA") { // SUJA
      background = "linear-gradient(90deg, #3C3C3C, #BBB9B4)";
      color = "#ffffff";
    } else if (flag === "F" || flag === "M" || flag === "D") { // FAXINA, MANUTENÇÃO, DESATIVADA
      background = "linear-gradient(90deg, #E14D4D, #CA3D3D)";
      color = "#FFFFFF"; // Texto branco para melhor contraste
    } else if (flag === "G") { // RESERVA ON-LINE
      background = "linear-gradient(90deg, #5A083D, #670470)";
      color = "#FFFFFF";
    } else if (flag === "GE" || flag === "GA") { // CLIENTE NA GARAGEM
      background = "linear-gradient(90deg, #D7A3AC, #FFC0CB)";
      color = "#000000"; // Texto preto para contraste em fundo claro
    } else if (flag === "A") { // EM ARRUMAÇÃO
      background = "linear-gradient(90deg, #BDBD1D, #ECF309)";
      color = "#000000"; // Texto preto para melhor leitura
    } else if (flag === "AR") { // À REVISAR
      background = "rgb(134, 84, 86)";
      color = "#FFFFFF";
    } else if (flag === "RA") { // REVISANDO
      background = "rgb(30, 94, 30)";
      color = "#FFFFFF";
    } else if (flag === "C") { // CIGARRO (MAU CHEIRO)
      background = "rgb(139, 121, 94)";
      color = "#FFFFFF";
    }
    return { background, color };
  };

  return (
    <div className="card-legend-container">
      <h3 className="legend-title">Legenda</h3>
      <div className="legend-grid">
        {legendItems.map((item, index) => {
          const { background, color } = getBackgroundColor(item.cor, item.texto);
          return (
            <div className="legend-item" key={index} style={{ background: background, color: color }}>
              <div
                className="legend-color-box"
                style={{ backgroundColor: item.cor }}
              />
              <span className="legend-text">{item.texto}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardLegend;
