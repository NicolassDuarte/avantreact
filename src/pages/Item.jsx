import React, { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock de dados do item
const item = {
  titulo: "Bicicleta Infantil Aro 16",
  descricao: "Bicicleta em ótimo estado, pouco usada, ideal para crianças de 5 a 8 anos.",
  categoria: "Brinquedos",
  localidade: "São Paulo, SP",
  tags: ["Infantil", "Usado", "Aro 16"],
  imagens: [
    // imagemPrincipal sempre primeiro
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
  // Estado para controlar qual imagem está sendo exibida como principal
  const [imgSelecionada, setImgSelecionada] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center align-items-start flex-wrap">
          {/* Imagem principal e miniaturas */}
          <div className="col-12 col-md-7 d-flex flex-column flex-md-row align-items-center mb-4 mb-md-0">
            {/* Coluna de miniaturas (desktop) */}
            <div className="d-none d-md-flex flex-column align-items-end me-4" style={{ gap: 20 }}>
              {item.imagens.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Foto ${idx + 1}`}
                  style={{
                    width: 85,
                    height: 85,
                    objectFit: "cover",
                    borderRadius: 10,
                    border: imgSelecionada === idx ? "2px solid #4caf50" : "2px solid #eee",
                    cursor: "pointer",
                    boxShadow: imgSelecionada === idx ? "0 2px 8px rgba(76,175,80,0.18)" : "0 2px 8px rgba(76,175,80,0.10)",
                    transition: "border 0.2s, box-shadow 0.2s"
                  }}
                  onClick={() => setImgSelecionada(idx)}
                />
              ))}
            </div>
            {/* Imagem principal */}
            <div className="d-flex justify-content-center align-items-center w-100">
              <img
                src={item.imagens[imgSelecionada]}
                alt="Imagem principal"
                className="img-fluid"
                style={{
                  width: "100%",
                  maxWidth: 520,
                  height: "auto",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: 22,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                  background: "#fff"
                }}
              />
            </div>
            {/* Miniaturas para mobile - ficam abaixo da principal */}
            <div className="d-flex d-md-none justify-content-center align-items-center w-100 mt-3" style={{ gap: 8 }}>
              {item.imagens.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Foto ${idx + 1}`}
                  style={{
                    width: 52,
                    height: 52,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: imgSelecionada === idx ? "2px solid #4caf50" : "2px solid #eee",
                    cursor: "pointer",
                    boxShadow: imgSelecionada === idx ? "0 2px 8px rgba(76,175,80,0.18)" : "0 2px 8px rgba(76,175,80,0.10)",
                    transition: "border 0.2s, box-shadow 0.2s"
                  }}
                  onClick={() => setImgSelecionada(idx)}
                />
              ))}
            </div>
          </div>
          {/* Detalhes do item */}
          <div className="col-12 col-md-5">
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                padding: "2rem",
                minWidth: 0,
                width: "100%"
              }}
            >
              {/* Tags */}
              <div className="mb-2 d-flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    fontSize: 16,
                    background: "#e8f5e9",
                    color: "#388e3c",
                    borderRadius: 8,
                    padding: "5px 14px",
                    fontWeight: 600
                  }}>{tag}</span>
                ))}
              </div>
              {/* Título */}
              <div style={{ fontWeight: "bold", fontSize: 32, marginBottom: 18 }}>
                {item.titulo}
              </div>
              {/* Descrição */}
              <div style={{ fontSize: 16, color: "#444", marginBottom: 24 }}>
                {item.descricao}
              </div>
              {/* Categoria */}
              <div style={{ fontSize: 15, color: "#666", marginBottom: 10 }}>
                <strong>Categoria:</strong> {item.categoria}
              </div>
              {/* Localidade */}
              <div style={{ fontSize: 15, color: "#666", marginBottom: 18 }}>
                <strong>Localidade:</strong> {item.localidade}
              </div>
              {/* Publicado por */}
              <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>
                Publicado por <strong>{item.publicadoPor}</strong> em {new Date(item.dataPublicacao).toLocaleDateString("pt-BR")}
              </div>
              {/* Botão Trocar */}
              <button className="btn btn-success btn-lg w-100 fw-bold" style={{ fontSize: "1.2rem", padding: "1rem" }}>
                Trocar
              </button>
            </div>
          </div>
        </div>
        {/* Miniaturas para mobile */}
        {/* Removido bloco antigo de miniaturas mobile, pois agora está junto da principal */}
      </div>
    </div>
  );
};

export default Item;