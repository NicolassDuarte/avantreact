import NavBar from "../components/NavBar/NavBar"
import { FaMapMarkerAlt, FaCalendarAlt, FaBoxOpen, FaFileImage } from "react-icons/fa";
import { RiFileSearchFill } from "react-icons/ri";
import { MdDescription } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import React, { useState } from "react";

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
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <NavBar />
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh"
      }}>
        <div style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          minWidth: "350px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Cadastrar Produto</h2>
          <form onSubmit={e => e.preventDefault()}>
            {fields.map((field) => (
              <div
                key={field.key}
                style={{ display: "flex", alignItems: "center", marginBottom: "1rem", cursor: "pointer" }}
                onClick={() => openPopup(field)}
              >
                {field.icon}
                <div style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", background: "#fafafa" }}>
                  {field.key === "localizacao"
                    ? (
                      values.localizacao && values.localizacao.cep
                        ? limitarTexto(`${values.localizacao.rua}, ${values.localizacao.bairro}, ${values.localizacao.cidade} - ${values.localizacao.estado} (${values.localizacao.cep})`)
                        : <span style={{ color: "#aaa" }}>{field.label}</span>
                    )
                    : field.key === "tipo"
                      ? (values.tipo ? limitarTexto(values.tipo) : <span style={{ color: "#aaa" }}>{field.label}</span>)
                      : values[field.key]
                        ? (field.type === "date"
                            ? limitarTexto(new Date(values[field.key]).toLocaleDateString("pt-BR"))
                            : limitarTexto(values[field.key]))
                        : <span style={{ color: "#aaa" }}>{field.label}</span>
                  }
                </div>
              </div>
            ))}
            {/* Adicionar foto como campo clicável */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "2rem",
                cursor: "pointer"
              }}
              onClick={() => document.getElementById("input-foto").click()}
            >
              <FaFileImage style={{ marginRight: 14, color: "#4caf50", fontSize: 24, verticalAlign: "middle" }} />
              <div style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", background: "#fafafa", display: "flex", alignItems: "center" }}>
                <span style={{ flex: 1, color: values.foto ? "#222" : "#aaa" }}>
                  {values.foto ? limitarTexto(values.foto.name) : "Adicionar foto"}
                </span>
                <FiPlusCircle style={{ color: "#4caf50", fontSize: 28, marginLeft: 8 }} />
                <input
                  id="input-foto"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhoto}
                />
              </div>
            </div>
            <button type="submit" style={{
              width: "100%",
              background: "#4caf50",
              color: "#fff",
              padding: "0.75rem",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer"
            }}>
              Salvar
            </button>
          </form>
        </div>
        {/* Popup */}
        {popup.open && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}>
            <div style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "12px",
              minWidth: "300px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)"
            }}>
              <h3 style={{ marginBottom: "1.5rem" }}>{popup.field.label}</h3>
              {/* Campo tipo select */}
              {popup.field.type === "select" && (
                <select
                  value={popup.tempValue}
                  onChange={e => setPopup(p => ({ ...p, tempValue: e.target.value }))}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "1.5rem" }}
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
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="CEP"
                      value={localizacaoTemp.cep}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, cep: e.target.value }))}
                      style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                      maxLength={9}
                    />
                    <button
                      type="button"
                      onClick={handleBuscarCep}
                      style={{
                        background: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5rem 1rem",
                        fontWeight: "bold",
                        cursor: "pointer"
                      }}
                      disabled={loadingCep}
                    >
                      {loadingCep ? "Buscando..." : "Buscar"}
                    </button>
                  </div>
                  {cepError && <div style={{ color: "red", marginBottom: "0.5rem" }}>{cepError}</div>}
                  {/* Linha 2: Logradouro */}
                  <input
                    type="text"
                    placeholder="Logradouro"
                    value={localizacaoTemp.rua}
                    onChange={e => setLocalizacaoTemp(l => ({ ...l, rua: e.target.value }))}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "0.5rem" }}
                  />
                  {/* Linha 3: Número, Bairro */}
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="Número"
                      value={localizacaoTemp.numero}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, numero: e.target.value }))}
                      style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <input
                      type="text"
                      placeholder="Bairro"
                      value={localizacaoTemp.bairro}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, bairro: e.target.value }))}
                      style={{ flex: 2, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                  </div>
                  {/* Linha 4: Cidade, Estado */}
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    <input
                      type="text"
                      placeholder="Cidade"
                      value={localizacaoTemp.cidade}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, cidade: e.target.value }))}
                      style={{ flex: 2, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                    <input
                      type="text"
                      placeholder="Estado"
                      value={localizacaoTemp.estado}
                      onChange={e => setLocalizacaoTemp(l => ({ ...l, estado: e.target.value }))}
                      style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
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
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "1.5rem" }}
                  autoFocus
                />
              )}
              {/* Campo input padrão */}
              {popup.field.type === "text" && (
                <input
                  type="text"
                  value={popup.tempValue}
                  onChange={e => setPopup(p => ({ ...p, tempValue: e.target.value }))}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "1.5rem" }}
                  autoFocus
                />
              )}
              {popup.field.type === "date" && (
                <input
                  type="date"
                  value={popup.tempValue}
                  onChange={e => setPopup(p => ({ ...p, tempValue: e.target.value }))}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "1.5rem" }}
                  autoFocus
                />
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <button
                  type="button"
                  onClick={closePopup}
                  style={{
                    background: "#eee",
                    color: "#333",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handlePopupSave}
                  style={{
                    background: "#4caf50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "0.5rem 1.2rem",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
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
