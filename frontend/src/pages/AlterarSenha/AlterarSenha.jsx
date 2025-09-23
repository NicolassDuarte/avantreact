import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import Swal from 'sweetalert2';
import './AlterarSenha.css';

const AlterarSenha = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validações
        if (!formData.senhaAtual || !formData.novaSenha || !formData.confirmarSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obrigatórios',
                text: 'Todos os campos são obrigatórios!',
            });
            setLoading(false);
            return;
        }

        if (formData.novaSenha !== formData.confirmarSenha) {
            Swal.fire({
                icon: 'error',
                title: 'Senhas não coincidem',
                text: 'A nova senha e a confirmação não são iguais!',
            });
            setLoading(false);
            return;
        }

        if (formData.novaSenha.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Senha muito curta',
                text: 'A nova senha deve ter pelo menos 6 caracteres!',
            });
            setLoading(false);
            return;
        }

        try {
            const response = await api.put(`/usuarios/${user.id_usuario}/senha`, {
                senhaAtual: formData.senhaAtual,
                novaSenha: formData.novaSenha
            });

            Swal.fire({
                icon: 'success',
                title: 'Senha alterada!',
                text: 'Sua senha foi alterada com sucesso!',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                navigate('/perfil'); // Alterado para redirecionar para o perfil
            });

        } catch (error) {
            console.error('Erro ao alterar senha:', error);

            let errorMessage = 'Erro ao alterar senha. Tente novamente.';
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
        <div className="alterar-senha-container">
            <NavBar />
            <div className="main-content-alterar-senha">
                <div className="card-alterar-senha">
                    <h2 className="text-center mb-4">Alterar Senha</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="senhaAtual" className="form-label">Senha Atual</label>
                            <input
                                type="password"
                                className="form-control"
                                id="senhaAtual"
                                name="senhaAtual"
                                value={formData.senhaAtual}
                                onChange={handleChange}
                                required
                                placeholder="Digite sua senha atual"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="novaSenha"
                                name="novaSenha"
                                value={formData.novaSenha}
                                onChange={handleChange}
                                required
                                placeholder="Digite a nova senha (mínimo 6 caracteres)"
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
                                required
                                placeholder="Confirme a nova senha"
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Alterando...' : 'Alterar Senha'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/perfil')}
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

export default AlterarSenha;