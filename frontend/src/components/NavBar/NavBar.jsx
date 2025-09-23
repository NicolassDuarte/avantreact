import React, { useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Swal from 'sweetalert2';
import "./NavBar.css";
import Logo from '../../../public/logo.png';
import Perfil from '../../../public/perfilp.png';
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
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
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img src={Logo} alt="EcoTroca" className="img-logo" />
        </Link>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Início</Link>
        <HashLink smooth to="/#populares" onClick={closeMenu}>Populares</HashLink>
        <Link
          to="/cadastro-produto"
          onClick={handleAnuncieClick}
        >
          Anuncie
        </Link>
        <HashLink smooth to="/#sobre-nos" onClick={closeMenu}>Sobre nós</HashLink>

        {/* Links para mobile */}
        <div className="mobile-auth">
          {user ? (
            <>
              <div className="user-info-mobile">
                <img src={Perfil} alt="Perfil" className="img-perfil-mobile" />
                <span className="user-welcome-mobile">Olá, {user.nome}</span>
              </div>
              <Link to="/perfil" onClick={closeMenu}>Meu Perfil</Link>
              <button onClick={handleLogout} className="btn-logout-mobile">Sair</button>
            </>
          ) : (
            <Link to="/login" className="btn-login-mobile" onClick={closeMenu}>Fazer login</Link>
          )}
        </div>
      </div>

      <div className="navbar-actions">
        {user ? (
          <>
            <span className="user-welcome">Olá, {user.nome}</span>
            <Link to="/perfil">
              <img src={Perfil} alt="Perfil" className="img-perfil" />
            </Link>
            <button onClick={handleLogout} className="btn-logout">Sair</button>
          </>
        ) : (
          <Link to="/login" className="btn-login">Fazer login</Link>
        )}
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default NavBar;