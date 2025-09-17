import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";
import TrocaModal from "../../components/TrocaModal/TrocaModal";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Item.css";

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgSelecionada, setImgSelecionada] = useState(0);
  const [showTrocaModal, setShowTrocaModal] = useState(false);
  const [userItens, setUserItens] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar dados do item
        const response = await api.get(`/itens/${id}`);
        setItem(response.data);

        // Verificar se o usuário está logado
        const token = localStorage.getItem('token');
        if (token) {
          try {
            // Decodificar o token para obter informações do usuário
            const payload = JSON.parse(atob(token.split('.')[1]));

            // Ajuste para a estrutura do seu token
            const userIdentifier = payload.id || payload.id_usuario || payload.userId;
            setUserId(userIdentifier);

            // Carregar itens do usuário
            const userItensResponse = await api.get(`/itens/meus-itens?userId=${userIdentifier}`);
            setUserItens(userItensResponse.data);
          } catch (error) {
            console.error("Erro ao carregar informações do usuário:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTrocarClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Você precisa estar logado para propor uma troca!");
      navigate('/login');
      return;
    }
    setShowTrocaModal(true);
  };

  const handlePropostaTroca = async (itemOferecidoId) => {
    try {
      await api.post('/trocas', {
        itemOferecidoId: itemOferecidoId,
        itemDesejadoId: item.id_item,
        ofertanteId: userId,
        receptorId: item.donoId
      });
      alert("Proposta de troca enviada com sucesso!");
      setShowTrocaModal(false);
    } catch (error) {
      console.error("Erro ao enviar proposta de troca:", error);
      alert("Erro ao enviar proposta de troca. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="item-page">
        <NavBar />
        <div className="container py-5 text-center">
          <p>Carregando item...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="item-page">
        <NavBar />
        <div className="container py-5 text-center">
          <p>Item não encontrado.</p>
        </div>
      </div>
    );
  }

  const imagens = item.imagemUrl
    ? [`http://localhost:3001${item.imagemUrl}`]
    : ["/placeholder-item.png"];

  return (
    <div className="item-page">
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center align-items-start flex-wrap">
          {/* Imagem principal + miniaturas */}
          <div className="col-12 col-md-7 d-flex flex-column flex-md-row align-items-center mb-4 mb-md-0">
            {/* Miniaturas (desktop) */}
            <div className="thumbnails-desktop">
              {imagens.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Foto ${idx + 1}`}
                  className={`thumbnail ${imgSelecionada === idx ? "active" : ""}`}
                  onClick={() => setImgSelecionada(idx)}
                />
              ))}
            </div>

            {/* Imagem principal */}
            <div className="main-image-container">
              <img
                src={imagens[imgSelecionada]}
                alt="Imagem principal"
                className="main-image"
              />
            </div>

            {/* Miniaturas (mobile) */}
            <div className="thumbnails-mobile">
              {imagens.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Foto ${idx + 1}`}
                  className={`thumbnail-mobile ${imgSelecionada === idx ? "active" : ""}`}
                  onClick={() => setImgSelecionada(idx)}
                />
              ))}
            </div>
          </div>

          {/* Detalhes do item */}
          <div className="col-12 col-md-5">
            <div className="item-details">
              {item.tags && item.tags.length > 0 && (
                <div className="tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              <div className="item-title">{item.titulo}</div>
              <div className="item-description">{item.descricao}</div>
              <div className="item-category"><strong>Categoria:</strong> {item.categoria?.nome || "Sem categoria"}</div>
              <div className="item-location">
                <strong>Localidade:</strong> {item.cidade}, {item.bairro}
              </div>
              <div className="item-published">
                Publicado por <strong>{item.dono?.nome || "Desconhecido"}</strong>
                {item.data_criacao && (
                  <> em {new Date(item.data_criacao).toLocaleDateString("pt-BR")}</>
                )}
              </div>

              <button
                className="btn btn-success btn-lg w-100 fw-bold item-button"
                onClick={handleTrocarClick}
              >
                Trocar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Troca */}
      <TrocaModal
        show={showTrocaModal}
        onHide={() => setShowTrocaModal(false)}
        userItens={userItens}
        onPropostaTroca={handlePropostaTroca}
        itemDesejado={item}
      />

      <Footer />
    </div>
  );
};

export default Item;