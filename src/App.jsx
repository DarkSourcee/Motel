import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CardComponent from './components/Card/CardComponent';
import CardSuites from './components/CardSuites/CardSuites';
import CardLegend from './components/CardLegend/CardLegend';
import Login from './components/Login/Login';

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex">
      <div className="flex-grow-1 custom-padding">
        <Navbar />
        <CardComponent />
        <div className="mb-2"></div>
        <CardSuites />
        {!isMobile && <CardLegend />}
      </div>
    </div>
  );
};

const PrivateRoute = ({ element }) => {
  const ddns = localStorage.getItem("ddns");
  return ddns ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
};

export default App;
