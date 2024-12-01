import React, { useEffect, useState } from 'react';
import { FaBed } from 'react-icons/fa';
import axios from 'axios';
import ModalAguardandoArrumacao from '../Modals/AguardandoArrumacao/AguardandoArrumacao';
import './CardComponent.css'

const CardComponent = () => {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://motelexotico.ddns.net:1011/info')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const suites = data.suites;
  const ocupacao = suites.filter(suite => suite.flag === 'O').length;
  const esperaArrumacao = suites.filter(suite => suite.flag === 'EA');
  const totalSuites = suites.length;

  const handleSuiteClick = () => {
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false); 
  };

  return (
    <div className="container mt-4">
      <h2>Motel Exótico</h2>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-primary rounded-3">
            <div className="card-body">
              Caixa atual
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-success d-flex align-items-center p-4 rounded-3">
            <FaBed size={30} className="mr-3" />
            <div className="d-flex flex-column">
              <span>Ocupação das Suítes</span>
              <strong className="display-4">{ocupacao}/{totalSuites}</strong>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card clickable-card text-white bg-warning d-flex align-items-center p-4 rounded-3" onClick={handleSuiteClick}>
                <FaBed size={30} className="mr-3" />
                <div className="d-flex flex-column">
                <span>Suítes à espera de arrumação</span>
                <strong className="display-4">{esperaArrumacao.length}/{totalSuites}</strong>
                </div>
            </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <div className="card text-white bg-danger rounded-3">
            <div className="card-body">
              Informações das Suítes
            </div>
          </div>
        </div>
      </div>

      <ModalAguardandoArrumacao show={showModal} close={closeModal} suites={esperaArrumacao} />
    </div>
  );
};

export default CardComponent;
