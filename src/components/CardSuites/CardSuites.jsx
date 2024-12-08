import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CardSuites.css';

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

    // Configura o intervalo de 30 segundos para atualizar os dados
    const intervalId = setInterval(fetchData, 30000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []);

  const getCardColor = (tipo, flag) => {
    let background, color;
  
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
  

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Informações das Suítes</h2>
      <div className="row g-3 d-flex justify-content-start">
        {suites.map((suite) => {
          const { background, color } = getCardColor(suite.tipo, suite.flag);
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-1" key={suite.suite}>
              <div
                className="card button"
                style={{
                  background,
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
