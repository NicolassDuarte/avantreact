import NavBar from "../../components/NavBar/NavBar"
import { FaMapMarkerAlt, FaCalendarAlt, FaBoxOpen, FaFileImage } from "react-icons/fa";
import { RiFileSearchFill } from "react-icons/ri";
import { MdDescription } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../../assets/css/style.css"; // Importa o CSS customizado
import "./CadastroProduto.css";

const tipoOptions = [
  "Eletrônico",
  "Roupas",
  "Móveis",
  "Brinquedos",
  "Livros",
  "Outro"
];

const fields = [
  { key: "nome", label: "Nome do item", icon: <FaBoxOpen style={{ marginRight: 14, color: "#4caf50", fontSize: 24, verticalAlign: "middle" }} />, type: "text" },
  { key: "tipo", label: "Tipo", icon: <RiFileSearchFill style={{ marginRight: 14, color: "#4caf50", fontSize: 24, verticalAlign: "middle" }} />, type: "select" },
  { key: "descricao", label: "Descrição", icon: <MdDescription style={{ marginRight: 14, color: "#4caf50", fontSize: 24, verticalAlign: "middle" }} />, type: "textarea" },
  { key: "localizacao", label: "Localização", icon: <FaMapMarkerAlt style={{ marginRight: 14, color: "#4caf50", fontSize: 24, verticalAlign: "middle" }} />, type: "localizacao" },
  { key: "data", label: "Data", icon: <FaCalendarAlt style={{ marginRight: 14, color: "#4caf50", fontSize: 24, verticalAlign: "middle" }} />, type: "date" },
];

const Anuncios = () => {
  const [values, setValues] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    localizacao: {
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: ""
    },
    data: "",
    foto: null,
  });
  const [popup, setPopup] = useState({ open: false, field: null, tempValue: "" });
  const [localizacaoTemp, setLocalizacaoTemp] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: ""
  });
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");

  const openPopup = (field) => {
    if (field.key === "localizacao") {
      setLocalizacaoTemp(values.localizacao || {
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      });
      setCepError("");
      setPopup({ open: true, field, tempValue: "" });
    } else {
      setPopup({
        open: true,
        field,
        tempValue: values[field.key] || "",
      });
    }
  };

  const closePopup = () => setPopup({ open: false, field: null, tempValue: "" });

  const handlePopupSave = () => {
    if (popup.field.key === "localizacao") {
      setValues((v) => ({ ...v, localizacao: localizacaoTemp }));
    } else {
      setValues((v) => ({ ...v, [popup.field.key]: popup.tempValue }));
    }
    closePopup();
  };

  const handlePhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValues((v) => ({ ...v, foto: e.target.files[0] }));
    }
  };

  const handleBuscarCep = async () => {
    setCepError("");
    setLoadingCep(true);
    try {
      const resp = await fetch(`https://viacep.com.br/ws/${localizacaoTemp.cep.replace(/\D/g, "")}/json/`);
      const data = await resp.json();
      if (data.erro) {
        setCepError("CEP não encontrado.");
      } else {
        setLocalizacaoTemp(loc => ({
          ...loc,
          rua: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || ""
        }));
      }
    } catch {
      setCepError("Erro ao buscar CEP.");
    }
    setLoadingCep(false);
  };

  // Função utilitária para limitar caracteres
  const limitarTexto = (texto, limite = 32) => {
    if (!texto) return "";
    return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
  };

  return (
    <div className="cadastro-bg">
      <NavBar />
      <div className="container cadastro-container">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="cadastro-card">
              <h2 className="cadastro-title">Cadastrar Produto</h2>
              <form onSubmit={e => e.preventDefault()}>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="mb-3 d-flex align-items-center cadastro-field"
                    onClick={() => openPopup(field)}
                  >
                    {field.icon}
                    <div className="cadastro-field-value">
                      {field.key === "localizacao"
                        ? (
                          values.localizacao && values.localizacao.cep
                            ? limitarTexto(`${values.localizacao.rua}, ${values.localizacao.bairro}, ${values.localizacao.cidade} - ${values.localizacao.estado} (${values.localizacao.cep})`)
                            : <span className="cadastro-placeholder">{field.label}</span>
                        )
                        : field.key === "tipo"
                          ? (values.tipo ? limitarTexto(values.tipo) : <span className="cadastro-placeholder">{field.label}</span>)
                          : values[field.key]
                            ? (field.type === "date"
                              ? limitarTexto(new Date(values[field.key]).toLocaleDateString("pt-BR"))
                              : limitarTexto(values[field.key]))
                            : <span className="cadastro-placeholder">{field.label}</span>
                      }
                    </div>
                  </div>
                ))}
                {/* Adicionar foto como campo clicável */}
                <div
                  className="mb-4 d-flex align-items-center cadastro-foto"
                  onClick={() => document.getElementById("input-foto").click()}
                >
                  <FaFileImage className="cadastro-foto-icon" />
                  <div className="cadastro-foto-value">
                    <span className={values.foto ? "cadastro-foto-nome" : "cadastro-placeholder"}>
                      {values.foto ? limitarTexto(values.foto.name) : "Adicionar foto"}
                    </span>
                    <FiPlusCircle className="cadastro-foto-plus" />
                    <input
                      id="input-foto"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handlePhoto}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success w-100 fw-bold cadastro-btn">
                  Salvar
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Popup */}
        {popup.open && (
          <div className="cadastro-popup-bg">
            <div className="cadastro-popup">
              <h3 className="cadastro-popup-title">{popup.field.label}</h3>
              {/* Campo tipo select */}
              {popup.field.type === "select" && (
                <select
                  value={popup.tempValue}
                  onChange={e => setPopup(p => ({ ...p, tempValue: e.target.value }))}
                  className="cadastro-popup-input"
                  autoFocus
                >
                  <option value="">Selecione...</option>
                  {tipoOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
              {/* Campo localização */}
              {popup.field.type === "localizacao" && (
                <div>
                  {/* Linha 1: CEP */}
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="CEP"
                      value={localizacaoTemp.cep}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, cep: e.target.value }))}
                      className="cadastro-popup-input flex-fill"
                      maxLength={9}
                    />
                    <button
                      type="button"
                      onClick={handleBuscarCep}
                      className="btn btn-success cadastro-popup-btn"
                      disabled={loadingCep}
                    >
                      {loadingCep ? "Buscando..." : "Buscar"}
                    </button>
                  </div>
                  {cepError && <div className="cadastro-popup-error mb-2">{cepError}</div>}
                  {/* Linha 2: Logradouro */}
                  <input
                    type="text"
                    placeholder="Logradouro"
                    value={localizacaoTemp.rua}
                    onChange={e => setLocalizacaoTemp(l => ({ ...l, rua: e.target.value }))}
                    className="cadastro-popup-input mb-2"
                  />
                  {/* Linha 3: Número, Bairro */}
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Número"
                      value={localizacaoTemp.numero}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, numero: e.target.value }))}
                      className="cadastro-popup-input flex-fill"
                    />
                    <input
                      type="text"
                      placeholder="Bairro"
                      value={localizacaoTemp.bairro}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, bairro: e.target.value }))}
                      className="cadastro-popup-input flex-fill"
                    />
                  </div>
                  {/* Linha 4: Cidade, Estado */}
                  <div className="d-flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Cidade"
                      value={localizacaoTemp.cidade}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, cidade: e.target.value }))}
                      className="cadastro-popup-input flex-fill"
                    />
                    <input
                      type="text"
                      placeholder="Estado"
                      value={localizacaoTemp.estado}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, estado: e.target.value }))}
                      className="cadastro-popup-input flex-fill"
                    />
                  </div>
                </div>
              )}
              {/* Campo textarea */}
              {popup.field.type === "textarea" && (
                <textarea
                  value={popup.tempValue}
                  onChange={e => setPopup(p => ({ ...p, tempValue: e.target.value }))}
                  rows={3}
                  className="cadastro-popup-input mb-3"
                  autoFocus
                />
              )}
              {/* Campo input padrão */}
              {popup.field.type === "text" && (
                <input
                  type="text"
                  value={popup.tempValue}
                  onChange={e => setPopup(p => ({ ...p, tempValue: e.target.value }))}
                  className="cadastro-popup-input mb-3"
                  autoFocus
                />
              )}
              {popup.field.type === "date" && (
                <input
                  type="date"
                  value={popup.tempValue}
                  onChange={e => setPopup(p => ({ ...p, tempValue: e.target.value }))}
                  className="cadastro-popup-input mb-3"
                  autoFocus
                />
              )}
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  onClick={closePopup}
                  className="btn btn-light cadastro-popup-btn"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handlePopupSave}
                  className="btn btn-success cadastro-popup-btn"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};


export default Anuncios;
