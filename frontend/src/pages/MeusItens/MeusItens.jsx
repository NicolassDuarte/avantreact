import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import './MeusItens.css';

const MeusItens = () => {
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        console.log("Usuário logado:", user);
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


        if (user) {
            fetchMeusItens();
        }
    }, [user]);

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
                                        <button className="btn btn-sm btn-outline-primary">Editar</button>
                                        <button className="btn btn-sm btn-outline-danger">Excluir</button>
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