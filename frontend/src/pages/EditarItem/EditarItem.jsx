import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import api from "../../services/api";
import { atualizarItem } from "../../services/itemService";
import "./EditarItem.css";

const EditarItem = () => {
    const { id } = useParams(); // id do item pela URL
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        titulo: "",
        descricao: "",
        cidade: "",
        bairro: "",
        endereco: "",
        status: "DISPONIVEL",
        imagem: null,
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await api.get(`/itens/${id}`);
                setItem(response.data);
                setFormData({
                    titulo: response.data.titulo,
                    descricao: response.data.descricao,
                    cidade: response.data.cidade,
                    bairro: response.data.bairro,
                    endereco: response.data.endereco,
                    status: response.data.status,
                    imagem: null,
                });
            } catch (error) {
                console.error("Erro ao carregar item:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("titulo", formData.titulo);
            data.append("descricao", formData.descricao);
            data.append("cidade", formData.cidade);
            data.append("bairro", formData.bairro);
            data.append("endereco", formData.endereco);
            data.append("status", formData.status);
            if (formData.imagem) {
                data.append("imagem", formData.imagem);
            }

            await api.put(`/itens/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Item atualizado com sucesso!");
            navigate("/meus-itens");
        } catch (error) {
            console.error("Erro ao atualizar item:", error);
            alert("Erro ao atualizar item.");
        }
    };

    if (loading) {
        return (
            <div>
                <NavBar />
                <p>Carregando item...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div>
                <NavBar />
                <p>Item não encontrado.</p>
            </div>
        );
    }

    return (
        <div className="editar-item-container">
            <NavBar />
            <div className="editar-item-form-container">
                <h2>Editar Item</h2>
                <form onSubmit={handleSubmit}>
                    <label>Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                    />

                    <label>Descrição</label>
                    <textarea
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />

                    <label>Cidade</label>
                    <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                    />

                    <label>Bairro</label>
                    <input
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleChange}
                    />

                    <label>Endereço</label>
                    <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                    />

                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="DISPONIVEL">Disponível</option>
                        <option value="NEGOCIANDO">Negociando</option>
                        <option value="INDISPONIVEL">Indisponível</option>
                    </select>

                    <label>Imagem</label>
                    <input type="file" name="imagem" onChange={handleChange} />

                    <button type="submit" className="btn btn-primary">
                        Atualizar Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditarItem;
