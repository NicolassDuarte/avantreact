import React, { useState } from "react";
import "./Cadastro.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import loginIcon from "../../assets/user-login.png";
import passwordIcon from "../../assets/password-login.png";
import telephoneIcon from "../../assets/telephone.png";
import emailIcon from "../../assets/email.png";
import api from "../../services/api";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const Cadastro = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        telefone: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validações
        if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obrigatórios',
                text: 'Por favor, preencha todos os campos obrigatórios!',
            });
            setLoading(false);
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Senhas não coincidem',
                text: 'As senhas digitadas não são iguais!',
            });
            setLoading(false);
            return;
        }

        if (formData.senha.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Senha muito curta',
                text: 'A senha deve ter pelo menos 6 caracteres!',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
            });

            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado!',
                text: 'Usuário cadastrado com sucesso!',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                // Redirecionar para login após sucesso
                window.location.href = '/login';
            });

        } catch (error) {
            console.error(error);

            let errorMessage = "Erro ao cadastrar usuário";
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.code === "ERR_NETWORK") {
                errorMessage = "Erro de conexão. Verifique se o servidor está rodando.";
            }

            Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cadastro-container-perfil">
            <NavBar />
            <main className="main-content">
                <form className="cadastro-box" onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4">Criar conta</h2>

                    {/* Nome */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={loginIcon} alt="Nome" />
                            </span>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className="classColor form-control"
                                placeholder="Nome completo *"
                                required
                            />
                        </div>
                    </div>

                    {/* E-mail */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={emailIcon} alt="E-mail" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="classColor form-control"
                                placeholder="E-mail *"
                                required
                            />
                        </div>
                    </div>

                    {/* Telefone */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={telephoneIcon} alt="Telefone" />
                            </span>
                            <input
                                type="text"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                className="classColor form-control"
                                placeholder="Telefone"
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
                                className="classColor form-control"
                                placeholder="Senha *"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {/* Confirmar Senha */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={passwordIcon} alt="Confirmar senha" />
                            </span>
                            <input
                                type="password"
                                name="confirmarSenha"
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                                className="classColor form-control"
                                placeholder="Confirmar senha *"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {/* Botão Criar Conta */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn-entrar btn btn-success"
                            disabled={loading}
                        >
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </div>
                </form>

                <div className="cadastreContainer">
                    <p className="text-center mt-3">
                        Já possui conta?{" "}
                        <Link to="/login" className="signup-link">
                            Entrar
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Cadastro;