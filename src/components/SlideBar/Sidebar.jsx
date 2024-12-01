import React, { useState } from 'react';
import './Slidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="d-flex" id="wrapper">
      <div
        className={`bg-dark text-white ${isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'} p-3`}
        id="sidebar"
      >
        <div className="hamburger-icon" onClick={toggleSidebar}>
          <div className={`bar bar1 ${isExpanded ? '' : 'open'}`}></div>
          <div className={`bar bar2 ${isExpanded ? '' : 'open'}`}></div>
          <div className={`bar bar3 ${isExpanded ? '' : 'open'}`}></div>
        </div>
        <h4 className={`text-center ${isExpanded ? '' : 'd-none'}`}>Menu</h4>
        <ul className="list-unstyled">
          <li><a href="#home" className="text-white">SELECIONAR HOTEL</a></li>
          <li><a href="#about" className="text-white">SAIR</a></li>
        </ul>
      </div>

      <div
        id="page-content-wrapper"
        style={{
          marginLeft: isExpanded ? '250px' : '80px',
          transition: 'margin-left 0.3s ease',
          paddingTop: '20px',
        }}
      >
      </div>
    </div>
  );
};

export default Sidebar;
