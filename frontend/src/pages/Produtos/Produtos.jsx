import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";
import "./Produtos.css";

const produtos = [
    // https://unsplash.com/pt-br
    {
        id: 1,
        titulo: "Livro - Senhor dos Anéis",
        descricao: "Edição de colecionador, capa dura",
        imagem: "https://images.unsplash.com/photo-1589625855224-84765314d377",
        categoria: "Livros",
        dono: "João",
    },
    {
        id: 2,
        titulo: "Tênis Nike Air",
        descricao: "Usado poucas vezes, tamanho 42",
        imagem: "https://images.unsplash.com/photo-1560906992-4b00de401b90",
        categoria: "Calçados",
        dono: "Maria",
    },
    {
        id: 3,
        titulo: "Notebook Dell",
        descricao: "i5, 8GB RAM, ótimo estado",
        imagem: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
        categoria: "Eletrônicos",
        dono: "Carlos",
    },
    {
        id: 4,
        titulo: "Violão Yamaha",
        descricao: "Clássico, pouco usado",
        imagem: "https://images.unsplash.com/photo-1687436980690-f50f2bd60a93",
        categoria: "Instrumentos",
        dono: "Ana",
    },
    {
        id: 5,
        titulo: "Bicicleta Caloi",
        descricao: "Bicicleta de passeio em bom estado",
        imagem: "https://plus.unsplash.com/premium_photo-1753875517987-b857cb3841cc",
        categoria: "Esportes",
        dono: "Pedro",
    },
    {
        id: 6,
        titulo: "Bolsa Feminina",
        descricao: "Bolsa de couro, pouco usada",
        imagem: "https://images.unsplash.com/photo-1751522917613-68281b131e45",
        categoria: "Acessórios",
        dono: "Larissa",
    },
    {
        id: 7,
        titulo: "Smartphone Samsung",
        descricao: "Galaxy S10, ótimo estado",
        imagem: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017",
        categoria: "Eletrônicos",
        dono: "Rafael",
    },
    {
        id: 8,
        titulo: "Camisa de Time",
        descricao: "Camisa oficial do Brasil",
        imagem: "https://images.unsplash.com/photo-1577212017184-80cc0da11082",
        categoria: "Roupas",
        dono: "Gustavo",
    },
    {
        id: 9,
        titulo: "Caixa de Som JBL",
        descricao: "Caixa de som bluetooth portátil",
        imagem: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        categoria: "Eletrônicos",
        dono: "Fernanda",
    },
    {
        id: 10,
        titulo: "Coleção de Quadrinhos",
        descricao: "Marvel edição limitada",
        imagem: "https://images.unsplash.com/photo-1734517709284-b6dcc9afd30b",
        categoria: "Colecionáveis",
        dono: "André",
    },
];

const Produtos = () => {
    const navigate = useNavigate();

    const handleVisualizar = (id) => {
        navigate(`/item/${id}`);
    };

    return (
        <div>
            <NavBar />
            <div className="produtos-container">
                <h1 className="titulo-pagina">Objetos disponíveis para troca</h1>
                <p className="subtitulo-pagina">
                    Confira abaixo os itens anunciados e encontre algo para trocar!
                </p>

                <div className="grid-produtos">
                    {produtos.map((item) => (
                        <div key={item.id} className="card-produto">
                            <div className="imagem-container">
                                <img src={item.imagem} alt={item.titulo} />
                                <span className="categoria">{item.categoria}</span>
                            </div>
                            <div className="info-produto">
                                <h2>{item.titulo}</h2>
                                <p className="descricao">{item.descricao}</p>
                                <p className="dono">
                                    Anunciado por: <strong>{item.dono}</strong>
                                </p>
                                <button
                                    className="btn-visualizar"
                                    onClick={() => handleVisualizar(item.id)}
                                >
                                    Visualizar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Produtos;