import React from 'react';
import './AguardandoArrumacao.css';

const ModalAguardandoArrumacao = ({ show, close, suites }) => {
  if (!show) return null;

  // Ordena as suítes por nome
  const sortedSuites = [...suites].sort((a, b) => a.suite.localeCompare(b.suite));

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-custom">
          <div className="modal-header">
            <h5 className="modal-title">Suítes à Espera de Arrumação</h5>
            <button type="button" className="close" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row">
              {sortedSuites.length > 0 ? (
                sortedSuites.map((suite) => (
                  <div className="col-md-4 mb-3" key={suite.suite}>
                    <div className="card card-custom">
                      <div className="card-body">
                        <h6>{suite.suite}</h6>
                        <p>{suite.descricao}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Não há suítes aguardando arrumação no momento.</p>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={close}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAguardandoArrumacao;
