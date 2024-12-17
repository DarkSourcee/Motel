import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OcupacaoSuite.css';

const ModalOcupacaoSuites = ({ show, close }) => {
  const [suites, setSuites] = useState([]);

  useEffect(() => {
    if (show) {
      axios.get('http://motelexotico.ddns.net:1011/info')
        .then(response => setSuites(response.data.suites))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [show]);

  if (!show) return null;

  const statusCounts = suites.reduce(
    (acc, suite) => {
      const status = suite.flag;
      if (acc[status] !== undefined) {
        acc[status]++;
      }
      return acc;
    },
    { O: 0, EA: 0, D: 0, F: 0, M: 0, C: 0, A: 0, MC: 0, G: 0, GE: 0, AR: 0, RA: 0 }
  );

  const diariaCount = suites.filter(suite => suite.tipo === 'DIARIA' && suite.comanda?.trim()).length;
  const periodoCount = suites.filter(suite => suite.tipo === 'PERIODO' && suite.comanda?.trim()).length;
  const pernoiteCount = suites.filter(suite => suite.tipo === 'PERNOITE' && suite.comanda?.trim()).length;
  const mcCount = suites.filter(suite => suite.tipo === 'MC' && suite.comanda?.trim()).length;

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
                {statusCounts.O > 0 && (
                  <li>
                    <strong>🛏️ Ocupadas:</strong>
                    <span className="number-ball" style={{ backgroundColor: 'rgba(0, 123, 255, 0.6)' }}>
                      {statusCounts.O}
                    </span>
                  </li>
                )}
                {periodoCount > 0 && (
                  <li>
                    <strong>⏰ Período:</strong>
                    <span className="number-ball" style={{ backgroundColor: 'rgba(40, 167, 69, 0.6)' }}>
                      {periodoCount}
                    </span>
                  </li>
                )}
                {diariaCount > 0 && (
                  <li>
                    <strong>🗓️ Diária:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#EB8C11' }}>
                      {diariaCount}
                    </span>
                  </li>
                )}
                {pernoiteCount > 0 && (
                  <li>
                    <strong>⏳ Pernoite:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#9DCDF5' }}>
                      {pernoiteCount}
                    </span>
                  </li>
                )}
                {statusCounts.EA > 0 && (
                  <li>
                    <strong>🧹 Esperando Arrumação:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#3C3C3C' }}>
                      {statusCounts.EA}
                    </span>
                  </li>
                )}
                {statusCounts.D > 0 && (
                  <li>
                    <strong>❌ Desativadas:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#E14D4D' }}>
                      {statusCounts.D}
                    </span>
                  </li>
                )}
                {statusCounts.F > 0 && (
                  <li>
                    <strong>🧽 Faxina:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#E14D4D' }}>
                      {statusCounts.F}
                    </span>
                  </li>
                )}
                {statusCounts.M > 0 && (
                  <li>
                    <strong>🛠 Manutenção:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#E14D4D' }}>
                      {statusCounts.M}
                    </span>
                  </li>
                )}
                {statusCounts.C > 0 && (
                  <li>
                    <strong>🚬 Cigarro:</strong>
                    <span className="number-ball" style={{ backgroundColor: 'rgb(139, 121, 94)' }}>
                      {statusCounts.C}
                    </span>
                  </li>
                )}
                {statusCounts.A > 0 && (
                  <li>
                    <strong>🧼 Em Arrumação:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#BDBD1D' }}>
                      {statusCounts.A}
                    </span>
                  </li>
                )}
                {statusCounts.AR > 0 && (
                  <li>
                    <strong>🔍 A Revisar:</strong>
                    <span className="number-ball" style={{ backgroundColor: 'rgb(134, 84, 86)' }}>
                      {statusCounts.AR}
                    </span>
                  </li>
                )}
                {statusCounts.RA > 0 && (
                  <li>
                    <strong>🛠️ Revisando:</strong>
                    <span className="number-ball" style={{ backgroundColor: 'rgb(30, 94, 30)' }}>
                      {statusCounts.RA}
                    </span>
                  </li>
                )}
                {mcCount > 0 && (
                  <li>
                    <strong>⚠️ Mau Cliente:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#F194A4' }}>
                      {statusCounts.MC}
                    </span>
                  </li>
                )}
                {statusCounts.G > 0 && (
                  <li>
                    <strong>🌐 Reserva - Online:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#5A083D' }}>
                      {statusCounts.G}
                    </span>
                  </li>
                )}
                {statusCounts.GE > 0 && (
                  <li>
                    <strong>🚗 Cliente na Garagem:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#D7A3AC' }}>
                      {statusCounts.GE}
                    </span>
                  </li>
                )}
                {statusCounts.PROMOCIONAL > 0 && (
                  <li>
                    <strong>🏷️ Promocional:</strong>
                    <span className="number-ball" style={{ backgroundColor: '#0059A0' }}>
                      {statusCounts.PROMOCIONAL}
                    </span>
                  </li>
                )}
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
