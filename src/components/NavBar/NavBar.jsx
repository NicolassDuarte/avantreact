import React from "react";
import './NavBar.css'; // Onde ficarão nossos estilos
import '../../App.css'

const NavBar = () => {
  return (
    <nav className="navbar p-3">
      {/* Seção do Logo */}
      <div className="navbar-logo">
        <a href="/">
          <img className="img-logo" src="logo.png" alt="Eco Troca" />
        </a>
      </div>

      {/* Links de Navegação */}
      <div className="navbar-links link-style">
        <a href="/">Início</a>
        <a href="/login">Cadastro</a>
        <a href="/populares">Populares</a>
        <a href="/anuncios">Anuncie</a>
      </div>

      {/* Ações do Usuário */}
      <div className="navbar-actions">
        <a className="btn-login" href="/login">Login/Cadastro</a>
        <a href="/perfil">
          <img className="img-perfil" src="perfilp.png" alt="Ver perfil" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;