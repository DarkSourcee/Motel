import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalAguardandoArrumacao from '../Modals/AguardandoArrumacao/AguardandoArrumacao';
import ModalOcupacaoSuites from '../Modals/OcupacaoSuites/OcupacaoSuite'; 
import ModalCaixaAtual from '../Modals/CaixaAtual/ModalCaixaAtual'; 
import './CardComponent.css';

const CardComponent = () => {
  const [data, setData] = useState(null);
  const [caixaData, setCaixaData] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [showModalOcupacao, setShowModalOcupacao] = useState(false); 
  const [showModalCaixa, setShowModalCaixa] = useState(false); 

  useEffect(() => {
    axios.get('http://motelexotico.ddns.net:1011/info')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));

    axios.get('http://motelexotico.ddns.net:1011/caixaatual')
      .then(response => setCaixaData(response.data))
      .catch(error => console.error('Error fetching caixa data:', error));
  }, []);

  if (!data || !caixaData) {
    return <div>Loading...</div>;
  }

  const suites = data.suites;
  const ocupacao = suites.filter(suite => suite.flag === 'O').length;
  const esperaArrumacao = suites.filter(suite => suite.flag === 'EA');
  const desativadas = suites.filter(suite => suite.flag === 'D');
  const totalSuites = suites.length;

  // Calcular o total do caixa
  const totalCaixa = caixaData.reduce((sum, item) => {
    if (item.caixa) {
      return sum + parseFloat(item.caixa.replace(',', '.'));
    }
    if (item.Valor) {
      return sum + parseFloat(item.Valor.replace(',', '.'));
    }
    return sum;
  }, 0).toFixed(2);

  const handleSuiteClick = () => {
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  const handleOcupacaoClick = () => {
    setShowModalOcupacao(true); 
  };

  const closeModalOcupacao = () => {
    setShowModalOcupacao(false); 
  };

  const handleCaixaClick = () => {
    setShowModalCaixa(true); 
  };

  const closeModalCaixa = () => {
    setShowModalCaixa(false); 
  };

  return (
    <div className="container mt-4">
      <h2>Motel Exótico</h2>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card clickable-card text-white bg-primary d-flex align-items-center p-4 rounded-3" onClick={handleCaixaClick}>
            <div className="d-flex flex-column">
              <span>Caixa Atual</span>
              <div className="display-4">R$ {totalCaixa}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-success d-flex align-items-center p-4 rounded-3">
            <div className="d-flex flex-column">
              <span>Ocupação das Suítes</span>
              <strong className="display-4">{ocupacao}/{totalSuites}</strong>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card clickable-card text-white bg-secondary d-flex align-items-center p-4 rounded-3" onClick={handleSuiteClick}>
            <div className="d-flex flex-column">
              <span>Suítes à espera de arrumação</span>
              <strong className="display-4">{esperaArrumacao.length}/{totalSuites}</strong>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card clickable-card text-white bg-danger d-flex align-items-center p-4 rounded-3" onClick={handleOcupacaoClick}>
            <div className="d-flex flex-column">
              <span>Informações das Suítes</span>
              <strong className="display-4">{desativadas.length}/{totalSuites}</strong>
            </div>
          </div>
        </div>
      </div>

      <ModalAguardandoArrumacao show={showModal} close={closeModal} suites={esperaArrumacao} />
      <ModalOcupacaoSuites show={showModalOcupacao} close={closeModalOcupacao} suites={suites} />
      <ModalCaixaAtual show={showModalCaixa} close={closeModalCaixa} caixaData={caixaData} /> {/* Modal de Caixa Atual */}
    </div>
  );
};

export default CardComponent;
