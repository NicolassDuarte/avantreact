// src/services/itemService.js
import api from "./api";

export const criarItem = async (dados) => {
    const response = await api.post("/itens", dados);
    return response.data;
};

export const listarItens = async () => {
    const response = await api.get("/itens");
    return response.data;
};

export const buscarItemPorId = async (id_item) => {
    const response = await api.get(`/itens/${id_item}`);
    return response.data;
};

export const atualizarItem = async (id_item, dados) => {
    const response = await api.put(`/itens/${id_item}`, dados);
    return response.data;
};

export const deletarItem = async (id_item) => {
    await api.delete(`/itens/${id_item}`);
};
