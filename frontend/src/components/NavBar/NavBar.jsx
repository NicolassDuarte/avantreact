import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <header className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <a href="/">
          <img src="logo.png" alt="EcoTroca" className="img-logo" />
          {/* <span className="logo-text"></span> */}
        </a>
      </div>

      {/* Links */}
      <nav className="navbar-links">
        <a href="/">Início</a>
        <a href="#populares">Populares</a>
        <a href="/cadastro-produto">Anuncie</a>
        <a href="#sobre-nos">Sobre nós</a>
      </nav>

      {/* Botão e Perfil */}
      <div className="navbar-actions">
        <a href="/login" className="btn-login">Fazer login</a>
        <a href="/perfil">
          <img src="perfilp.png" alt="Perfil" className="img-perfil" />
        </a>
      </div>
    </header>
  );
};

export default NavBar;
