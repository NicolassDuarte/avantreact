import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import { deletarItem } from '../../services/itemService';
import api from '../../services/api';
import './MeusItens.css';

const MeusItens = () => {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeusItens = async () => {
            try {
                const response = await api.get(`/itens/meus-itens?userId=${user.id_usuario}`);
                setItens(response.data);
            } catch (error) {
                console.error('Erro ao carregar itens:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchMeusItens();
    }, [user]);

    const handleEditar = (id) => {
        navigate(`/editar-item/${id}`);
    };

    const handleExcluir = (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Essa ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deletarItem(id);
                    setItens(itens.filter(item => item.id_item !== id));
                    Swal.fire(
                        'Excluído!',
                        'O item foi removido com sucesso.',
                        'success'
                    );
                } catch (error) {
                    console.error('Erro ao excluir item:', error);
                    Swal.fire(
                        'Erro!',
                        'Não foi possível excluir o item.',
                        'error'
                    );
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="meus-itens-container">
                <NavBar />
                <div className="main-content-itens">
                    <div className="text-center">Carregando...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="meus-itens-container">
            <NavBar />
            <div className="main-content-itens">
                <div className="card-itens">
                    <h2 className="text-center mb-4">Meus Itens</h2>

                    {itens.length === 0 ? (
                        <div className="text-center">
                            <p>Você ainda não possui itens cadastrados.</p>
                            <a href="/cadastro-produto" className="btn btn-success">
                                Cadastrar Primeiro Item
                            </a>
                        </div>
                    ) : (
                        <div className="itens-list">
                            {itens.map(item => (
                                <div key={item.id_item} className="item-card">
                                    <div className="item-image">
                                        <img
                                            src={item.imagemUrl ? `http://localhost:3001${item.imagemUrl}` : '/placeholder-item.png'}
                                            alt={item.titulo}
                                        />
                                    </div>
                                    <div className="item-info">
                                        <h5>{item.titulo}</h5>
                                        <p>{item.descricao}</p>
                                        <div className="item-status">
                                            <span className={`status-badge status-${item.status.toLowerCase()}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handleEditar(item.id_item)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleExcluir(item.id_item)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MeusItens;
