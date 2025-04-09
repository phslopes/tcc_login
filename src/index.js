import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import SistemaAcademico from './sistema/SistemaAcademico';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sistema" element={<SistemaAcademico />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
