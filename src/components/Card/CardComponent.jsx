import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalAguardandoArrumacao from '../Modals/AguardandoArrumacao/AguardandoArrumacao';
import ModalOcupacaoSuites from '../Modals/OcupacaoSuites/OcupacaoSuite';
import ModalCaixaAtual from '../Modals/CaixaAtual/ModalCaixaAtual';
import ModalDesativadas from '../Modals/Desativadas/Desativadas';
import './CardComponent.css';
import getApiUrl from '../../shared/config';

const CardComponent = () => {
  const [data, setData] = useState(null);
  const [caixaData, setCaixaData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalOcupacao, setShowModalOcupacao] = useState(false);
  const [showModalCaixa, setShowModalCaixa] = useState(false);
  const [showModalDesativadas, setShowModalDesativadas] = useState(false);

  useEffect(() => {
    const { url, urlCaixa } = getApiUrl();
    const fetchData = () => {
      axios.get(url)
        .then(response => setData(response.data))
        .catch(error => console.error('Error fetching data:', error));

      axios.get(urlCaixa)
        .then(response => {
          setCaixaData(response.data);
        })
        .catch(error => console.error('Error fetching caixa data:', error));
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  if (!data || !caixaData) {
    return <div>Loading...</div>;
  }
  
  const suites = data.suites;
  const ocupacao = suites.filter(suite => suite.flag === 'O').length;
  const esperaArrumacao = suites.filter(suite => suite.flag === 'EA');
  const desativadas = suites.filter(suite => suite.flag === 'D' || suite.flag === 'M' || suite.flag === 'F');
  const totalSuites = suites.length;

  const totalCaixa = caixaData[0]?.caixa || 0.00;

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

  const handleDesativadasClick = () => {
    setShowModalDesativadas(true);
  };

  const closeModalDesativadas = () => {
    setShowModalDesativadas(false);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        {/* Card de Caixa Atual */}
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="card clickable-card text-white bg-primary d-flex align-items-center p-4 rounded-3" onClick={handleCaixaClick}>
            <div className="d-flex flex-column">
              <span>Caixa Atual</span>
              <div className="font">{totalCaixa}</div>
            </div>
          </div>
        </div>

        {/* Card de Ocupação das Suítes */}
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="card clickable-card text-white bg-success d-flex align-items-center p-4 rounded-3" onClick={handleOcupacaoClick}>
            <div className="d-flex flex-column">
              <span>Ocupação das Suítes</span>
              <strong className="font">{ocupacao}/{totalSuites}</strong>
            </div>
          </div>
        </div>

        {/* Card de Suítes à espera de arrumação */}
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="card clickable-card text-white bg-secondary d-flex align-items-center p-4 rounded-3" onClick={handleSuiteClick}>
            <div className="d-flex flex-column">
              <span>Suítes à espera de arrumação</span>
              <strong className="font">{esperaArrumacao.length}/{totalSuites}</strong>
            </div>
          </div>
        </div>

        {/* Card de Suítes Desativadas */}
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="card clickable-card text-white bg-danger d-flex align-items-center p-4 rounded-3" onClick={handleDesativadasClick}>
            <div className="d-flex flex-column">
              <span>Informações das Suítes</span>
              <strong className="font">{desativadas.length}/{totalSuites}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ModalAguardandoArrumacao show={showModal} close={closeModal} suites={esperaArrumacao} />
      <ModalOcupacaoSuites show={showModalOcupacao} close={closeModalOcupacao} suites={suites} />
      <ModalCaixaAtual show={showModalCaixa} close={closeModalCaixa} caixaData={caixaData} />
      <ModalDesativadas show={showModalDesativadas} close={closeModalDesativadas} suites={desativadas} />
    </div>
  );
};

export default CardComponent;
