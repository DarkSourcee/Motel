import React, { useState } from "react";
import "./Slidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="d-flex" id="wrapper">
        <div
          className={`bg-dark text-white ${isExpanded ? "sidebar-expanded" : "sidebar-collapsed"} p-3`}
          id="sidebar"
        >
          <div className="hamburger-icon mb-3" onClick={toggleSidebar}>
            <div className={`bar bar1 ${isExpanded ? "" : "open"}`}></div>
            <div className={`bar bar2 ${isExpanded ? "" : "open"}`}></div>
            <div className={`bar bar3 ${isExpanded ? "" : "open"}`}></div>
          </div>

          <ul className="list-unstyled">
            <li>
              <a href="#home" className="text-white" style={{ textDecoration: 'none' }}>
                <h4>
                  <span className="emoji-icon" style={{ filter: 'grayscale(100%)' }}>🏪</span>
                  {isExpanded && ' SELECIONAR HOTEL'}
                </h4>
              </a>
            </li>
            <li>
              <a href="#about" className="text-white" style={{ textDecoration: 'none' }}>
                <h4>
                  <span className="emoji-icon" style={{ color: 'red' }}>🚪</span>
                  {isExpanded && ' SAIR'}
                </h4>
              </a>
            </li>
          </ul>
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
