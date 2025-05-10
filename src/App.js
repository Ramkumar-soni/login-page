import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import ProtectedPage from './pages/ProtectedPage';
import './styles/App.scss';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CreateCustomer from './pages/CreateCustomer';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/account/register" element={<CreateCustomer />} />
          <Route path="/account" element={true ? <ProtectedPage /> : <LoginPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
