import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardSuites = () => {
  const [suites, setSuites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://motelexotico.ddns.net:1011/info');
        const sortedSuites = response.data.suites.sort((a, b) => {
            return a.suite.localeCompare(b.suite); 
        });
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
        default:
          backgroundColor = "#f0f0f0";
          color = "#000000";
      }
    } else if (flag === "EA") {
      backgroundColor = "#F0E68C";
      color = "#000000";
    } else {
      backgroundColor = "#f0f0f0";
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
        {suites.map((suite) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-1" key={suite.suite}>
            <div
              className="card"
              style={{
                ...getCardColor(suite.tipo, suite.flag),
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 1, 1)',
              }}
            >
              <div className="card-body">
                <h5 className="card-title text-truncate">{suite.suite}</h5>
                <p className="card-text text-truncate">{suite.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSuites;
