import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ModalCaixaAtual.css';

const ModalCaixaAtual = ({ show, close }) => {
  const [caixaData, setCaixaData] = useState([]);

  useEffect(() => {
    if (show) {
      axios.get('http://motelexotico.ddns.net:1011/caixaatual')
        .then(response => setCaixaData(response.data))
        .catch(error => console.error('Error fetching caixa data:', error));
    }
  }, [show]);

  // Calculando o total do caixa
  const totalCaixa = caixaData.reduce((sum, item) => {
    if (item.caixa) {
      return sum + parseFloat(item.caixa.replace(',', '.'));
    }
    if (item.Valor) {
      return sum + parseFloat(item.Valor.replace(',', '.'));
    }
    return sum;
  }, 0).toFixed(2);

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop-custom"></div>

      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal-custom">
            <div className="modal-header">
              <h5 className="modal-title">Caixa Atual</h5>
              <button type="button" className="btn-close" onClick={close}></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column">
                <span><strong>💰 Total do Caixa:</strong></span>
                <strong className="display-4">R$ {totalCaixa}</strong>
                <hr />
                <span><strong>Forma de Pagamento</strong></span>
                {caixaData.map((item, index) => (
                  item.FormaPagamento && item.Valor && (
                    <div key={index} className="d-flex justify-content-between">
                      <span>{item.FormaPagamento}</span>
                      <span>R$ {parseFloat(item.Valor).toFixed(2)}</span>
                    </div>
                  )
                ))}
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
    </>
  );
};

export default ModalCaixaAtual;