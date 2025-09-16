import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import NavBar from "../../components/NavBar/NavBar";
import loginIcon from '../../assets/user-login.png';
import passwordIcon from '../../assets/password-login.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData.email, formData.senha);

      // Salvar token e informações do usuário usando o contexto
      authLogin(response.user, response.token);

      Swal.fire({
        icon: 'success',
        title: 'Login realizado!',
        text: 'Você foi autenticado com sucesso!',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate('/');
      });

    } catch (error) {
      setError(error.error || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <NavBar />
      <main className="main-content">
        <form className="login-box" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Entrar na conta</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* E-mail */}
          <div className="mb-3">
            <div className="input-group div-input">
              <span className="classColor input-group-text bg-light">
                <img className="imgClass" src={loginIcon} alt="E-mail" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="classColor form-control"
                placeholder="E-mail"
                required
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
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="classColor form-control bg-light"
                placeholder="Senha"
                required
              />
            </div>
          </div>

          {/* Esqueceu a senha */}
          <div className="text-center mb-3">
            <Link to="/recuperar-senha" className="forgot-password">
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Botão Entrar */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn-entrar btn btn-success"
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="cadastreContainer">
          {/* Link de cadastro */}
          <p className="text-center mt-3">
            Não possui conta?{' '}
            <Link to="/cadastro" className="signup-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;