import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Item.css";

// Mock de dados do item
const item = {
  titulo: "Bicicleta Infantil Aro 16",
  descricao: "Bicicleta em ótimo estado, pouco usada, ideal para crianças de 5 a 8 anos.",
  categoria: "Brinquedos",
  localidade: "São Paulo, SP",
  tags: ["Infantil", "Usado", "Aro 16"],
  imagens: [
    "https://http2.mlstatic.com/D_NQ_NP_911118-MLB80117182923_102024-O-nobreak-600va-com-6-tomadas-entrada-saida-127v-estabilizador.webp",
    "https://http2.mlstatic.com/D_NQ_NP_702364-MLB79864185044_102024-O-nobreak-600va-com-6-tomadas-entrada-saida-127v-estabilizador.webp",
    "https://http2.mlstatic.com/D_NQ_NP_954589-MLB80116778905_102024-O-nobreak-600va-com-6-tomadas-entrada-saida-127v-estabilizador.webp",
    "https://http2.mlstatic.com/D_NQ_NP_976215-MLB79864087162_102024-O-nobreak-600va-com-6-tomadas-entrada-saida-127v-estabilizador.webp",
    "https://http2.mlstatic.com/D_NQ_NP_985071-MLB80116916079_102024-O-nobreak-600va-com-6-tomadas-entrada-saida-127v-estabilizador.webp",
  ],
  imagemPrincipal: "https://http2.mlstatic.com/D_NQ_NP_911118-MLB80117182923_102024-O-nobreak-600va-com-6-tomadas-entrada-saida-127v-estabilizador.webp",
  publicadoPor: "João Silva",
  dataPublicacao: "2024-06-10"
};

const Item = () => {
  const [imgSelecionada, setImgSelecionada] = useState(0);

  return (
    <div className="item-page">
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center align-items-start flex-wrap">
          {/* Imagem principal e miniaturas */}
          <div className="col-12 col-md-7 d-flex flex-column flex-md-row align-items-center mb-4 mb-md-0">

            {/* Miniaturas (desktop) */}
            <div className="thumbnails-desktop">
              {item.imagens.map((img, idx) => (
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
                src={item.imagens[imgSelecionada]}
                alt="Imagem principal"
                className="main-image"
              />
            </div>

            {/* Miniaturas (mobile) */}
            <div className="thumbnails-mobile">
              {item.imagens.map((img, idx) => (
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
              {/* Tags */}
              <div className="tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>

              <div className="item-title">{item.titulo}</div>
              <div className="item-description">{item.descricao}</div>
              <div className="item-category"><strong>Categoria:</strong> {item.categoria}</div>
              <div className="item-location"><strong>Localidade:</strong> {item.localidade}</div>
              <div className="item-published">
                Publicado por <strong>{item.publicadoPor}</strong> em {new Date(item.dataPublicacao).toLocaleDateString("pt-BR")}
              </div>

              <button className="btn btn-success btn-lg w-100 fw-bold item-button">
                Trocar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
