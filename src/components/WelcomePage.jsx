import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-gradient bg-primary text-white">
      <Logo />
      <h4 className="mt-3">Welcome to the Upskill Admin Portal</h4>
      <p className="text-light">Secure access point provided by <span className='fw-bold text-warning'>Avis Tech</span></p>
      <div className="d-flex gap-2 mt-4">
        <div className="spinner-grow text-light" style={{ width: '10px', height: '10px' }}></div>
        <div className="spinner-grow text-light" style={{ width: '10px', height: '10px' }}></div>
        <div className="spinner-grow text-light" style={{ width: '10px', height: '10px' }}></div>
      </div>
    </div>
  );
};

export default WelcomePage;
