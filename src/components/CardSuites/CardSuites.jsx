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
        setSuites(sortedSuites );
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Informações das Suítes</h2>
      <div className="row">
        {suites.map((suite) => (
          <div className="col-md-2 mb-2" key={suite.suite}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{suite.suite}</h5>
                <p className="card-text">
                  {suite.descricao}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSuites;
