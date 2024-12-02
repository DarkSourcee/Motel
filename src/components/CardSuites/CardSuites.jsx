import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardSuites = () => {
  const [suites, setSuites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://motelexotico.ddns.net:1011/info');
        const sortedSuites = response.data.suites.sort((a, b) => a.suite.localeCompare(b.suite));
        setSuites(sortedSuites);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCardColor = (tipo, flag) => {
    let backgroundColor, color;
  
    if (flag === "O") {
      switch (tipo) {
        case "PERIODO":
          backgroundColor = "#4BA151";
          color = "#FFFFFF";
          break;
        case "DIARIA":
          backgroundColor = "#EB8C11";
          color = "#FFFFFF";
          break;
        case "PERNOITE":
          backgroundColor = "#5CACEE";
          color = "#FFFFFF";
          break;
        case "PROMOCIONAL":
          backgroundColor = "#0059A0";
          color = "#FFFFFF";
          break;
        case "MC": // MAU CLIENTE
          backgroundColor = "#F194A4";
          color = "#FFFFFF";
          break;
        default:
          backgroundColor = "#f0f0f0";
          color = "#000000";
      }
    } else if (flag === "EA") { // SUJA
      backgroundColor = "#3C3C3C";
      color = "#BBB9B4";
    } else if (flag === "F" || flag === "M" || flag === "D") { // FAXINA, MANUTENÇÃO, DESATIVADA
      backgroundColor = "#E14D4D";
      color = "#FFFFFF"; // Texto branco para melhor contraste
    } else if (flag === "G") { // RESERVA ON-LINE
      backgroundColor = "#5A083D";
      color = "#FFFFFF";
    } else if (flag === "GE" || flag === "GA") { // CLIENTE NA GARAGEM
      backgroundColor = "#D7A3AC";
      color = "#000000";
    } else if (flag === "EM") { // EM ARRUMAÇÃO
      backgroundColor = "#BDBD1D";
      color = "#000000";
    } else if (flag === "AR") { // À REVISAR
      backgroundColor = "#865456";
      color = "#FFFFFF";
    } else if (flag === "RA") { // REVISANDO
      backgroundColor = "#1e5e1e";
      color = "#FFFFFF";
    } else if (flag === "C") { // CIGARRO (MAU CHEIRO)
      backgroundColor = "#8b795e";
      color = "#FFFFFF";
    } else {
      backgroundColor = "#f0f0f0"; // DISPONÍVEL
      color = "#000000";
    }
  
    return { backgroundColor, color };
  };
  

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Informações das Suítes</h2>
      <div className="row g-3 d-flex justify-content-start">
        {suites.map((suite) => {
          const { backgroundColor, color } = getCardColor(suite.tipo, suite.flag);
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-1" key={suite.suite}>
              <div
                className="card"
                style={{
                  backgroundColor,
                  color,
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-truncate">{suite.suite}</h5>
                  <p className="card-text text-truncate">{suite.descricao}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardSuites;
