import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; 
import getApiUrl from '../../../shared/config';
import Swal from 'sweetalert2';

const ManutencaoSuites = ({ show, onHide, suite, flag }) => {
  const [motivo, setMotivo] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!suite) return null;

  const isFormEaDisp = flag === "EA" || flag === "";

  const handleMotivoChange = (e) => {
    setMotivo(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);  
  };

  const handleSubmit = async () => {
    if (!motivo) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Motivo é obrigatório.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (!selectedStatus) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Status é obrigatório.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }

    setLoading(true);
    setError('');

    const brasiliaDate = new Date();
    const brasiliaDateString = brasiliaDate.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    });

    const formattedDate = brasiliaDateString.replace(',', '').replace(/\//g, '-');

    const requestData = {
      suite: suite.suite,
      status_suite: selectedStatus,
      acao: "Ativada",
      motivo: motivo,
      data: formattedDate,
    };

    try {
      const { urlBloquear } = getApiUrl();
      
      const response = await axios.post(`${urlBloquear}`, requestData);

      if (response.status === 200) {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Requisição realizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        onHide();
      }

    } catch (error) {
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao enviar a requisição.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes da Suíte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isFormEaDisp ? (
          <Form>
            <div className="row mb-3">
              <div className="col-md-4">
                <Form.Label>Código:</Form.Label>
                <Form.Control plaintext readOnly value={suite.suite} />
              </div>
              <div className="col-md-4">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control plaintext readOnly value={suite.descricao} />
              </div>
            </div>

            <div className="row mb-6">
              <div className="col-md-12">
                <Form.Label>Selecione uma opção:</Form.Label>
                <Form.Select value={selectedStatus} onChange={handleStatusChange}>
                  <option value="">Selecione o status</option>
                  <option value="M">Manutenção</option>
                  <option value="D">Desativar</option>
                  <option value="C">Mal cheiro</option>
                </Form.Select>
              </div>
            </div>

            <div className="row mb-12">
              <div className="col-md-12">
                <Form.Label>Informe o motivo:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Digite o motivo aqui..."
                  value={motivo} // Valor vindo do estado
                  onChange={handleMotivoChange}
                />
              </div>
            </div>

            {error && <div className="text-danger">{error}</div>}

            <div className="row mt-3">
              <div className="col-md-12 text-center">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Requisição'}
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <div>
            <p>Este formulário está desabilitado devido à configuração da flag.</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManutencaoSuites;
