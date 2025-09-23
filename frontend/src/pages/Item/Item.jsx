import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";
import TrocaModal from "../../components/TrocaModal/TrocaModal";
import { useAuth } from '../../contexts/AuthContext';
import api from "../../services/api";
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Item.css";

const Item = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Adicionando useAuth aqui
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgSelecionada, setImgSelecionada] = useState(0);
  const [showTrocaModal, setShowTrocaModal] = useState(false);
  const [userItens, setUserItens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar dados do item
        const response = await api.get(`/itens/${id}`);
        setItem(response.data);

        // Se o usuário estiver logado, carregar seus itens
        if (user) {
          try {
            const userItensResponse = await api.get(`/itens/meus-itens?userId=${user.id_usuario}`);
            setUserItens(userItensResponse.data);
          } catch (error) {
            console.error("Erro ao carregar itens do usuário:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]); // Adicionando user como dependência

  const handleTrocarClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Você precisa estar logado para propor uma troca!',
        confirmButtonText: 'Fazer Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // Verificar se o usuário é o dono do item
    if (user && user.id_usuario === item.donoId) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Você não pode propor troca para seu próprio item!',
      });
      return;
    }

    setShowTrocaModal(true);
  };

  const handlePropostaTroca = async (itemOferecidoId) => {
    try {
      await api.post('/trocas', {
        itemOferecidoId: itemOferecidoId,
        itemDesejadoId: item.id_item,
        ofertanteId: user.id_usuario,
        receptorId: item.donoId
      });

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Proposta de troca enviada com sucesso!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        setShowTrocaModal(false);
      });
    } catch (error) {
      console.error("Erro ao enviar proposta de troca:", error);

      let errorMessage = 'Erro ao enviar proposta de troca. Tente novamente.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: errorMessage,
      });
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

  // transforma cada entrada de imagem em um src válido
  const toImgSrc = (u) => {
    if (!u) return null;
    if (u.startsWith('data:')) return u; // já é data URL (base64 completo)
    if (u.startsWith('/uploads')) return `http://localhost:3001${u}`; // caminho do servidor
    if (u.startsWith('http')) return u; // já é url completa
    return `data:image/jpeg;base64,${u}`; // é só o base64 “seco”
  };

  const imagens = (Array.isArray(item.imagemUrl) ? item.imagemUrl : [])
    .map(toImgSrc)
    .filter(Boolean);

  if (!imagens.length) imagens.push('/placeholder-item.png');


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
