import React, { useState, useEffect } from "react";
import axios from "axios";
import './Navbar.css';
import getApiUrl from "../../shared/config";

function Navbar() {
  const [empresa, setEmpresa] = useState(null);
  const [error, setError] = useState(null);

  // Função para buscar os dados da empresa
  const fetchEmpresa = async () => {
    try {
      const { url } = getApiUrl(); // Função que retorna a URL da API
      const response = await axios.get(url);
      setEmpresa(response.data.empresa);
      setError(null);
    } catch (err) {
      console.error("Erro ao buscar os dados da empresa:", err);
      setError("Não foi possível carregar os dados do Motel.");
    }
  };

  // useEffect para buscar os dados ao montar o componente
  useEffect(() => {
    fetchEmpresa();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white">
      <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center">
        {/* Marca e ícone */}
        <a href="/" className="navbar-brand text-white">
          <span role="img" aria-label="Motel">
            🏨
          </span>{" "}
          <span className="d-md-inline">
            {empresa && `${empresa}`}
          </span>
        </a>

        {/* Botões no modo mobile/tablet */}
        <div className="d-flex flex-wrap align-items-center">
          {/* <button onClick={fetchEmpresa} className="btn btn-light btn-sm me-2"> */}
          <a href="/" ><button   className="btn btn-light btn-sm me-2">
            Atualizar Motel
          </button>
          </a>
          {/* <a href="#logout" className="btn btn-danger btn-sm">
            Sair
          </a> */}
        </div>
      </div>

      {/* Informação do hotel selecionado */}
      {/* <div className="navbar-info bg-secondary text-white p-2 mt-2">
        {empresa ? (
          <span>{empresa}</span>
        ) : (
          error || <span>Carregando...</span>
        )}
      </div> */}
    </nav>
  );
}

export default Navbar;
