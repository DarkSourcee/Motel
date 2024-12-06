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
          backgroundColor = "linear-gradient(#4BA151, #5CE52B)";
          color = "#FFFFFF";
          break;
        case "DIARIA":
          backgroundColor = "linear-gradient(#EB8C11, #EDB123)";
          color = "#FFFFFF";
          break;
        case "PERNOITE":
          backgroundColor = "linear-gradient(#5CACEE, #9DCDF5)";
          color = "#FFFFFF";
          break;
        case "PROMOCIONAL":
          backgroundColor = "linear-gradient(#0059A0, #C8C8E9)";
          color = "#FFFFFF";
          break;
        case "MC": // MAU CLIENTE
          backgroundColor = "linear-gradient(#F194A4, #E74F69)";
          color = "#FFFFFF";
          break;
        default:
          backgroundColor = "linear-gradient(#f0f0f0, #f0f0f0)";
          color = "#000000";
      }
    } else if (flag === "EA") { // SUJA
      backgroundColor = "linear-gradient(#3C3C3C, #BBB9B4)";
      color = "#BBB9B4";
    } else if (flag === "F" || flag === "M" || flag === "D") { // FAXINA, MANUTENÇÃO, DESATIVADA
      backgroundColor = "linear-gradient(#E14D4D, #CA3D3D)";
      color = "#FFFFFF";
    } else if (flag === "G") { // RESERVA ON-LINE
      backgroundColor = "linear-gradient(#5A083D, #670470)";
      color = "#FFFFFF";
    } else if (flag === "GE" || flag === "GA") { // CLIENTE NA GARAGEM
      backgroundColor = "linear-gradient(#D7A3AC, #FFC0CB)";
      color = "#000000";
    } else if (flag === "EM") { // EM ARRUMAÇÃO
      backgroundColor = "linear-gradient(#BDBD1D, #ECF309)";
      color = "#000000";
    } else if (flag === "AR") { // À REVISAR
      backgroundColor = "linear-gradient(#865456, #865456)";
      color = "#FFFFFF";
    } else if (flag === "RA") { // REVISANDO
      backgroundColor = "linear-gradient(#1e5e1e, #1e5e1e)";
      color = "#FFFFFF";
    } else if (flag === "C") { // CIGARRO (MAU CHEIRO)
      backgroundColor = "linear-gradient(#8b795e, #8b795e)";
      color = "#FFFFFF";
    } else {
      backgroundColor = "linear-gradient(#f0f0f0, #f0f0f0)"; // DISPONÍVEL
      color = "#000000";
    }

    return { backgroundColor, color };
  };

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="legend-title">Informações das Suítes</h3>
      <div className="row g-3 d-flex justify-content-start">
        {suites.map((suite) => {
          const { backgroundColor, color } = getCardColor(suite.tipo, suite.flag);
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-1" key={suite.suite}>
              <div
                className="card"
                style={{
                  background: backgroundColor,
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
