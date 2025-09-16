import React from "react";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Adicione esta importação
import "./NavBar.css";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAnuncieClick = (e) => {
    if (!user) {
      e.preventDefault();
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Você precisa estar logado para anunciar um produto!',
        confirmButtonText: 'Fazer Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <a href="/">
          <img src="logo.png" alt="EcoTroca" className="img-logo" />
        </a>
      </div>

      <nav className="navbar-links">
        <a href="/">Início</a>
        <a href="#populares">Populares</a>
        <a
          href="/cadastro-produto"
          onClick={handleAnuncieClick}
        >
          Anuncie
        </a>
        <a href="#sobre-nos">Sobre nós</a>
      </nav>

      <div className="navbar-actions">
        {user ? (
          <>
            <span className="user-welcome">Olá, {user.nome}</span>
            <a href="/perfil">
              <img src="perfilp.png" alt="Perfil" className="img-perfil" />
            </a>
            <button onClick={handleLogout} className="btn-logout">Sair</button>
          </>
        ) : (
          <a href="/login" className="btn-login">Fazer login</a>
        )}
      </div>
    </header>
  );
};

export default NavBar;