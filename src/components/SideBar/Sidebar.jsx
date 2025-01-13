import React, { useState } from "react";
import axios from "axios";
import "./Slidebar.css";
import getApiUrl from "../../shared/config";

const Sidebar = () => {
  const [empresa, setEmpresa] = useState(null);
  const [error, setError] = useState(null);
  const [mostrarEmpresa, setMostrarEmpresa] = useState(false);

  const fetchEmpresa = async () => {
    try {
      const { url } = getApiUrl();
      setMostrarEmpresa((prev) => !prev);

      if (!mostrarEmpresa) {
        const response = await axios.get(url);
        setEmpresa(response.data.empresa);
        setError(null);
      }
    } catch (err) {
      console.error("Erro ao buscar os dados da empresa:", err);
      setError("Não foi possível carregar os dados do hotel.");
    }
  };

  return (
    <nav className="navbar bg-dark text-white">
      <div className="container-fluid">
        <a href="/" className="navbar-brand text-white">
          <span role="img" aria-label="Hotel">🏨</span> Sistema Hotel
        </a>
        <div className="d-flex align-items-center">
          <button
            onClick={fetchEmpresa}
            className="btn btn-light btn-sm me-2"
          >
            {mostrarEmpresa ? "Ocultar Hotel" : "Selecionar Hotel"}
          </button>
          <a href="#logout" className="btn btn-danger btn-sm">
            Sair
          </a>
        </div>
      </div>
      {/* Exibe o hotel selecionado */}
      {mostrarEmpresa && (
        <div className="navbar-info bg-secondary text-white p-2 mt-2">
          {empresa ? (
            <span>Hotel Selecionado: {empresa}</span>
          ) : (
            error || <span>Carregando...</span>
          )}
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
