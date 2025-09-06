import React from 'react';
import './Cadastro.css';
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import loginIcon from '../../assets/user-login.png';
import passwordIcon from '../../assets/password-login.png';
import telephoneIcon from '../../assets/telephone.png';
import emailIcon from '../../assets/email.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cadastro = () => {
    return (
        <div className="cadastro-container-perfil">
            <NavBar />
            <main className="main-content">
                <div className="cadastro-box">
                    <h2 className="text-center mb-4">Criar conta</h2>

                    {/* Nome */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={loginIcon} alt="Nome" />
                            </span>
                            <input type="text" className="classColor form-control" placeholder="Nome completo" />
                        </div>
                    </div>

                    {/* E-mail */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={emailIcon} alt="E-mail" />
                            </span>
                            <input type="email" className="classColor form-control" placeholder="E-mail" />
                        </div>
                    </div>

                    {/* Telefone */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={telephoneIcon} alt="Telefone" />
                            </span>
                            <input type="text" className="classColor form-control" placeholder="Telefone" />
                        </div>
                    </div>

                    {/* Senha */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={passwordIcon} alt="Senha" />
                            </span>
                            <input type="password" className="classColor form-control" placeholder="Senha" />
                        </div>
                    </div>

                    {/* Confirmar Senha */}
                    <div className="mb-3">
                        <div className="input-group div-input">
                            <span className="classColor input-group-text bg-light">
                                <img className="imgClass" src={passwordIcon} alt="Confirmar senha" />
                            </span>
                            <input type="password" className="classColor form-control" placeholder="Confirmar senha" />
                        </div>
                    </div>

                    {/* Botão Criar Conta */}
                    <div className="d-grid">
                        <button className="btn-entrar btn btn-success">Cadastrar</button>
                    </div>
                </div>

                <div className="cadastreContainer">
                    <p className="text-center mt-3">
                        Já possui conta?{' '}
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
