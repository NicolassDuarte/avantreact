import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import "./Produtos.css";

const Produtos = () => {
    const navigate = useNavigate();
    const [itens, setItens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const response = await api.get("/itens"); // pega todos os itens do backend
                setItens(response.data);
            } catch (error) {
                console.error("Erro ao buscar itens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItens();
    }, []);

    const handleVisualizar = (id) => {
        navigate(`/item/${id}`);
    };

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className="produtos-container">
                    <p>Carregando itens...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div className="produtos-container">
                <h1 className="titulo-pagina">Objetos disponíveis para troca</h1>
                <p className="subtitulo-pagina">
                    Confira abaixo os itens anunciados e encontre algo para trocar!
                </p>

                {itens.length === 0 ? (
                    <p>Nenhum item disponível no momento.</p>
                ) : (
                    <div className="grid-produtos">
                        {itens.map((item) => (
                            <div key={item.id_item} className="card-produto">
                                <div className="imagem-container">
                                    <img
                                        src={
                                            item.imagemUrl
                                                ? `http://localhost:3001${item.imagemUrl}`
                                                : "/placeholder-item.png"
                                        }
                                        alt={item.titulo}
                                    />
                                    <span className="categoria">{item.categoria?.nome || "Sem categoria"}</span>
                                </div>
                                <div className="info-produto">
                                    <h2>{item.titulo}</h2>
                                    <p className="descricao">{item.descricao}</p>
                                    <p className="dono">
                                        Anunciado por: <strong>{item.dono?.nome || "Desconhecido"}</strong>
                                    </p>
                                    <button
                                        className="btn-visualizar"
                                        onClick={() => handleVisualizar(item.id_item)}
                                    >
                                        Visualizar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Produtos;
