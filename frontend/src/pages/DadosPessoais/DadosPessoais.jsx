import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import './DadosPessoais.css';

const DadosPessoais = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="dados-pessoais-container">
            <NavBar />
            <div className="main-content-dados">
                <div className="card-dados">
                    <h2 className="text-center mb-4">Meus Dados Pessoais</h2>

                    <div className="dados-item">
                        <label>Nome:</label>
                        <span>{user?.nome}</span>
                    </div>

                    <div className="dados-item">
                        <label>Email:</label>
                        <span>{user?.email}</span>
                    </div>

                    <div className="dados-item">
                        <label>Data de Cadastro:</label>
                        <span>{new Date().toLocaleDateString('pt-BR')}</span>
                    </div>

                    <div className="text-center mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/editar-dados')}
                        >
                            Editar Dados
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DadosPessoais;