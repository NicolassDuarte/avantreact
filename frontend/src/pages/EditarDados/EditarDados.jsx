import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './EditarDados.css';

const EditarDados = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.nome || '',
                email: user.email || '',
                senha: '',
                confirmarSenha: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validações
        if (!formData.nome || !formData.email) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obrigatórios',
                text: 'Nome e email são obrigatórios!',
            });
            setLoading(false);
            return;
        }

        if (formData.senha && formData.senha !== formData.confirmarSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Senhas não coincidem',
                text: 'As senhas digitadas não são iguais!',
            });
            setLoading(false);
            return;
        }

        try {
            // Preparar dados para envio
            const dadosParaEnviar = {
                nome: formData.nome,
                email: formData.email
            };

            // Incluir senha apenas se foi preenchida
            if (formData.senha) {
                dadosParaEnviar.senha = formData.senha;
            }

            const response = await api.put(`/usuarios/${user.id_usuario}`, dadosParaEnviar);

            // Atualizar contexto de autenticação
            const updatedUser = {
                ...user,
                nome: formData.nome,
                email: formData.email
            };

            // Manter o token existente, apenas atualizar dados do usuário
            login(updatedUser, localStorage.getItem('token'));

            Swal.fire({
                icon: 'success',
                title: 'Dados atualizados!',
                text: 'Seus dados foram atualizados com sucesso!',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/dados-pessoais');
            });

        } catch (error) {
            console.error('Erro ao atualizar dados:', error);

            let errorMessage = 'Erro ao atualizar dados. Tente novamente.';
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            } else if (error.code === 'ERR_NETWORK') {
                errorMessage = 'Erro de conexão. Verifique se o servidor está rodando.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="editar-dados-container">
            <NavBar />
            <div className="main-content-editar">
                <div className="card-editar">
                    <h2 className="text-center mb-4">Editar Dados Pessoais</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="senha" className="form-label">
                                Nova Senha (deixe em branco para manter a atual)
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="senha"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                placeholder="Digite uma nova senha"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmarSenha" className="form-label">Confirmar Nova Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                                placeholder="Confirme a nova senha"
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Salvando...' : 'Salvar Alterações'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/dados-pessoais')}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarDados;