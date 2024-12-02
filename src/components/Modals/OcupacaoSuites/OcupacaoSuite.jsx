import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OcupacaoSuite.css';

const ModalOcupacaoSuites = ({ show, close }) => {
  const [suites, setSuites] = useState([]);
  const [periodoAtual, setPeriodoAtual] = useState("1");

  const [openCollapse, setOpenCollapse] = useState({
    O: false,   
    EA: false,  
    D: false,  
    A: false  
  });

  useEffect(() => {
    if (show) {
      axios.get('http://motelexotico.ddns.net:1011/info')
        .then(response => setSuites(response.data.suites))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [show]);

  if (!show) return null;

  console.log('Dados recebidos em suites:', suites);

  const statusCounts = suites.reduce(
    (acc, suite) => {
      const status = suite.flag;
      if (acc[status] !== undefined) {
        acc[status]++;
      }
      return acc;
    },
    { O: 0, EA: 0, D: 0, A: 0 }
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'O':
        return 'rgba(0, 123, 255, 0.6)';
      case 'EA':
        return 'rgba(0, 0, 0, 0.6)';
      case 'D':
        return 'rgba(255, 0, 0, 0.6)';
      case 'A':
        return 'rgba(255, 193, 7, 0.6)';
      default:
        return 'rgba(169, 169, 169, 0.6)';
    }
  };

  const getSuitesByStatus = (status) => {
    return suites.filter(suite => suite.flag === status);
  };

  const toggleCollapse = (status) => {
    setOpenCollapse(prevState => ({
      ...prevState,
      [status]: !prevState[status]
    }));
  };

  return (
    <>
      <div className="modal-backdrop-custom"></div>

      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-custom">
            <div className="modal-header">
              <h5 className="modal-title">Ocupação das Suítes</h5>
            </div>
            <div className="modal-body">
              <ul className="list-unstyled ml-3">
                <li>
                  <strong>🛏️ Ocupadas:</strong>
                  <span className="number-ball" style={{ backgroundColor: getStatusColor('O') }}>
                    {statusCounts.O}
                  </span>
                  {/* Botão para expandir/recolher */}
                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => toggleCollapse('O')}
                  >
                    {openCollapse.O ? 'Recolher' : 'Mostrar Suites'}
                  </button>
                  {/* Collapse para as suítes ocupadas, mostrando abaixo */}
                  <div className={`collapse mt-2 ${openCollapse.O ? 'show' : ''}`}>
                    <div className="card">
                      <div className="card-body">
                        <ul className="list-group">
                          {getSuitesByStatus('O').map((suite, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <small>Suite: {suite.suite}</small><br />
                                <strong>{suite.descricao}</strong>
                              </div>
                              <span className="badge" style={{ backgroundColor: getStatusColor('O') }}>
                                O
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <strong>🧹 Esperando Arrumação:</strong>
                  <span className="number-ball" style={{ backgroundColor: getStatusColor('EA') }}>
                    {statusCounts.EA}
                  </span>
                  {/* Botão para expandir/recolher */}
                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => toggleCollapse('EA')}
                  >
                    {openCollapse.EA ? 'Recolher' : 'Mostrar Suites'}
                  </button>
                  {/* Collapse para as suítes esperando arrumação, mostrando abaixo */}
                  <div className={`collapse mt-2 ${openCollapse.EA ? 'show' : ''}`}>
                    <div className="card">
                      <div className="card-body">
                        <ul className="list-group">
                          {getSuitesByStatus('EA').map((suite, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <small>Suite: {suite.suite}</small><br />
                                <strong>{suite.descricao}</strong>
                              </div>
                              <span className="badge" style={{ backgroundColor: getStatusColor('EA') }}>
                                EA
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <strong>❌ Desativadas:</strong>
                  <span className="number-ball" style={{ backgroundColor: getStatusColor('D') }}>
                    {statusCounts.D}
                  </span>
                  {/* Botão para expandir/recolher */}
                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => toggleCollapse('D')}
                  >
                    {openCollapse.D ? 'Recolher' : 'Mostrar Suites'}
                  </button>
                  {/* Collapse para as suítes desativadas, mostrando abaixo */}
                  <div className={`collapse mt-2 ${openCollapse.D ? 'show' : ''}`}>
                    <div className="card">
                      <div className="card-body">
                        <ul className="list-group">
                          {getSuitesByStatus('D').map((suite, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <small>Suite: {suite.suite}</small><br />
                                <strong>{suite.descricao}</strong>
                              </div>
                              <span className="badge" style={{ backgroundColor: getStatusColor('D') }}>
                                D
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <strong>🧼 Em Arrumação:</strong>
                  <span className="number-ball" style={{ backgroundColor: getStatusColor('A') }}>
                    {statusCounts.A}
                  </span>
                  {/* Botão para expandir/recolher */}
                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => toggleCollapse('A')}
                  >
                    {openCollapse.A ? 'Recolher' : 'Mostrar Suites'}
                  </button>
                  {/* Collapse para as suítes em arrumação, mostrando abaixo */}
                  <div className={`collapse mt-2 ${openCollapse.A ? 'show' : ''}`}>
                    <div className="card">
                      <div className="card-body">
                        <ul className="list-group">
                          {getSuitesByStatus('A').map((suite, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <small>Suite: {suite.suite}</small><br />
                                <strong>{suite.descricao}</strong>
                              </div>
                              <span className="badge" style={{ backgroundColor: getStatusColor('A') }}>
                                EA
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                {/* Período Atual */}
                <li>
                  <strong>⏰ Período Atual:</strong>
                  <span className="number-ball" style={{ backgroundColor: 'rgba(40, 167, 69, 0.6)' }}>
                    {periodoAtual}
                  </span>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={close}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalOcupacaoSuites;
