import React from 'react';
import './Login.css';
import NavBar from "../../components/NavBar/NavBar";
import loginIcon from '../../assets/user-login.png';
import passwordIcon from '../../assets/password-login.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <div className="login-container">
      <NavBar />
      <main className="main-content">
        <div className="login-box">
          <h2 className="text-center mb-4">Entrar na conta</h2>

          {/* E-mail/telefone */}
          <div className="mb-3">
            <div className="input-group div-input">
              <span className="classColor input-group-text bg-light">
                <img className="imgClass" src={loginIcon} alt="Senha" />
              </span>
              <input
                type="text"
                className="classColor form-control"
                placeholder="E-mail ou telefone"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="mb-3">
            <div className="input-group div-input">
              <span className="classColor input-group-text bg-light">
                <img className="imgClass" src={passwordIcon} alt="Senha" />
              </span>
              <input
                type="password"
                className="classColor form-control bg-light"
                placeholder="Senha"
              />
            </div>
          </div>

          {/* Esqueceu a senha */}
          <div className="text-center mb-3">
            <a href="/recuperar-senha" className="forgot-password">
              Esqueceu sua senha?
            </a>
          </div>

          {/* Botão Entrar */}
          <div className="d-grid">
            <button className="btn-entrar btn btn-success">Entrar</button>
          </div>
        </div>

        <div className="cadastreContainer">
          {/* Link de cadastro */}
          <p className="text-center mt-3">
            Não possui conta?{' '}
            <a href="/cadastro" className="signup-link">
              Cadastre-se
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;