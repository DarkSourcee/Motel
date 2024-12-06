import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OcupacaoSuite.css';

const ModalOcupacaoSuites = ({ show, close }) => {
  const [suites, setSuites] = useState([]);
  const [periodoAtual, setPeriodoAtual] = useState("1");

  useEffect(() => {
    if (show) {
      axios.get('http://motelexotico.ddns.net:1011/info')
        .then(response => setSuites(response.data.suites))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [show]);

  if (!show) return null;

  // Contabilizando as suítes de cada tipo
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

  // Contabilizando as suítes de tipo 'DIARIA', 'PERIODO' e 'PERNOITE'
  const diariaCount = suites.filter(suite => suite.tipo === 'DIARIA').length;
  const periodoCount = suites.filter(suite => suite.tipo === 'PERIODO').length;
  const pernoiteCount = suites.filter(suite => suite.tipo === 'PERNOITE').length; 

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
                </li>
                <li>
                  <strong>ㅤ ⏰ Período:</strong>
                  <span className="number-ball" style={{ backgroundColor: 'rgba(40, 167, 69, 0.6)' }}>
                    {periodoAtual}
                  </span>
                </li>
                <li>
                  <strong>ㅤ 🗓️ Diária:</strong>
                  <span className="number-ball" style={{ backgroundColor: 'rgba(0, 123, 255, 0.6)' }}>
                    {diariaCount}
                  </span>
                </li>
                <li>
                  <strong>ㅤ ⏳ Pernoite:</strong>
                  <span className="number-ball" style={{ backgroundColor: 'rgba(40, 167, 69, 0.6)' }}>
                    {pernoiteCount}
                  </span>
                </li>
                <li>
                  <strong>🧹 Esperando Arrumação:</strong>
                  <span className="number-ball" style={{ backgroundColor: getStatusColor('EA') }}>
                    {statusCounts.EA}
                  </span>
                </li>
                <li>
                  <strong>❌ Desativadas:</strong>
                  <span className="number-ball" style={{ backgroundColor: getStatusColor('D') }}>
                    {statusCounts.D}
                  </span>
                </li>
                <li>
                  <strong>🧼 Em Arrumação:</strong>
                  <span className="number-ball" style={{ backgroundColor: getStatusColor('A') }}>
                    {statusCounts.A}
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
