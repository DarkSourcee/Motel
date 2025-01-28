import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ManutencaoSuites = ({ show, onHide, suite }) => {
  if (!suite) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes da Suíte</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                <Form.Select>
                    <option>Opção 1</option>
                    <option>Opção 2</option>
                    <option>Opção 3</option>
                </Form.Select>
            </div>
          </div>

          <div className="row mb-12">
            <div className="col-md-12">
                <Form.Label>Informe o motivo:</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Digite o motivo aqui..."/>
            </div>
          </div>
        </Form>
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
