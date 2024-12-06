import React from 'react';
import './Desativadas.css';

const ModalDesativadas = ({ show, close, suites }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop-custom" onClick={close}></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-custom">
            <div className="modal-header">
              <h5 className="modal-title">Suítes Desativadas</h5>
              <button type="button" className="close" onClick={close} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {suites.length === 0 ? (
                <p>Não há suítes desativadas no momento.</p>
              ) : (
                <ul>
                  {suites.map((suite) => (
                    <li key={suite.suite}>
                      <strong>Suíte {suite.suite}</strong> -{" "}
                      {suite.comanda ? suite.comanda : "Nenhum motivo adicionado."}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={close}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDesativadas;
