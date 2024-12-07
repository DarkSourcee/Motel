import React from "react";
import "./AguardandoArrumacao.css";

const ModalAguardandoArrumacao = ({ show, close, suites }) => {
  if (!show) return null;

  const calcularTempoSujo = (dataInicio) => {
    const inicio = new Date(dataInicio);
    const agora = new Date();
    const diferencaMs = agora - inicio;

    const horas = Math.floor(diferencaMs / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${horas > 0 ? horas + "h " : ""}${minutos} Min`;
  };

  const suitesSujas = suites.filter((suite) => suite.flag === "EA");
  const sortedSuites = [...suitesSujas].sort((a, b) => a.suite.localeCompare(b.suite));

  return (
    <div className="modal-arrumacao">
      <div className="modal-backdrop-custom" onClick={close}></div>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-custom">
            <div className="modal-header">
              <h5 className="modal-title">SUÍTES A ESPERA DE ARRUMAÇÃO</h5>
              <button type="button" className="close" onClick={close} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h6 className="total-suites">
                TOTAL DE {sortedSuites.length} SUÍTES À ESPERA DE ARRUMAÇÃO
              </h6>
              <div className="card-container">
                {sortedSuites.length > 0 ? (
                  sortedSuites.map((suite) => (
                    <div className="card-wrapper" key={suite.suite}>
                      <div className="card card-custom">
                        <div className="card-body">
                          <div className="suite-numero">{suite.suite}</div>
                          <div className="suite-descricao">{suite.descricao}</div>
                          <div className="tempo-espera">{calcularTempoSujo(suite.Data)}</div>
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
              <button type="button" className="btn btn-danger" onClick={close}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAguardandoArrumacao;
