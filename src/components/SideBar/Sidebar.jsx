import React, { useState } from "react";
import axios from "axios";
import "./Slidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [empresa, setEmpresa] = useState(null); // Estado para armazenar o nome da empresa
  const [error, setError] = useState(null);
  const [mostrarEmpresa, setMostrarEmpresa] = useState(false); // Estado para alternar exibição

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchEmpresa = async () => {
    try {
      // Alternar entre mostrar e ocultar as informações
      setMostrarEmpresa((prev) => !prev);

      if (!mostrarEmpresa) {
        const response = await axios.get(
          "http://motelexotico.ddns.net:1011/info"
        );
        setEmpresa(response.data.empresa); // Armazena o nome da empresa no estado
        setError(null);
      }
    } catch (err) {
      console.error("Erro ao buscar os dados da empresa:", err);
      setError("Não foi possível carregar os dados do hotel.");
    }
  };

  return (
    <>
      <div className="d-flex" id="wrapper">
        <div
          className={`bg-dark text-white ${
            isExpanded ? "sidebar-expanded" : "sidebar-collapsed"
          } p-3`}
          id="sidebar"
        >
          <div className="hamburger-icon mb-3" onClick={toggleSidebar}>
            <div className={`bar bar1 ${isExpanded ? "" : "open"}`}></div>
            <div className={`bar bar2 ${isExpanded ? "" : "open"}`}></div>
            <div className={`bar bar3 ${isExpanded ? "" : "open"}`}></div>
          </div>

          <ul className="list-unstyled">
            <li>
              <button
                onClick={fetchEmpresa}
                className="text-white bg-transparent border-0 p-0"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <h4>
                  <span
                    className="emoji-icon"
                    style={{ filter: "grayscale(100%)" }}
                  >
                    🏪
                  </span>
                  {isExpanded && " SELECIONAR HOTEL"}
                </h4>
              </button>
            </li>
            <li>
              <a
                href="#about"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                <h4>
                  <span className="emoji-icon" style={{ color: "red" }}>
                    🚪
                  </span>
                  {isExpanded && " SAIR"}
                </h4>
              </a>
            </li>
          </ul>

          {/* Exibe ou oculta as informações do hotel */}
          {isExpanded && mostrarEmpresa && (
            <div className="mt-4">
              {empresa && (
                <div className="d-flex align-items-center">
                  <h5 className="mb-0">Hotel Selecionada:</h5>
                  <button
                    className="btn btn-primary btn-sm ms-2"
                    style={{ cursor: "default" }}
                  >
                    {empresa}
                  </button>
                </div>
              )}
              {error && (
                <div className="mt-4 text-danger">
                  <p>{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          id="page-content-wrapper"
          style={{
            marginLeft: isExpanded ? "330px" : "80px",
            transition: "margin-left 0.3s ease",
            paddingTop: "20px",
          }}
        ></div>
      </div>
    </>
  );
};

export default Sidebar;
