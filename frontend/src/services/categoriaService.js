import api from "./api";

export const getCategorias = async () => {
  // Faz a chamada GET para 'http://localhost:3001/api/categorias'
  try {
    const response = await api.get("/categorias");
    console.log(
      "%cLOG 1: Resposta da API de Categorias",
      "color: blue; font-weight: bold;",
      response.data
    );
    return response.data;
  } catch (error) {
    console.log("Erro ao retornar categorias:", error);
    throw new error();
  }
};
