const {getAllCategorias,getCategoriaById,addCategoria,deleteCategoria,updateCategoria} = require("../models/categoriaModel.js")

const getAllCategoriasTotais = async(req,res) =>{
    try{
        const categorias = await getAllCategorias()
        res.status(200).json(categorias)
    }
    catch(error){
        res.status(500).json({error:'Error ao pesquisas esta categoria!'})
    }
}

const getCategoriaByIdHandler = async (req,res) => {
    const id_categoria = Number.parseInt(req.params.id_categoria, 10);
    try{
        const categoria = await getCategoriaById(id_categoria)
        if(!categoria){
            return res.status(404).json({error:'Categoria especifica não encontrada'})
        }
        return res.status(200).json(categoria)
    }
    catch(error){
        console.log(error)
        return res.status(500).json("Erro ao buscar categoria de produtos")
    }
}

//ADM//

const createCategoriaHandler = async (req, res) => {
  const { nome } = req.body;

  try {
    const novaCategoria = await addCategoria(nome);
    return res.status(201).json(novaCategoria);
  } catch (error) {
    console.error(error);
    // erro de chave única (nome já existe)
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Categoria já existe" });
    }
    console.log(error)
    return res.status(500).json({ error: "Erro ao criar categoria" });
  }
};

const deleteCategoriaHandler = async (req,res) =>{
    const id_categoria = Number(req.params.id_categoria)
    try{
        await deleteCategoria(id_categoria)
        return res.status(204).send(id_categoria)
    }catch(error){
        if(error.message ==='Categoria não encontrada!'){
            return res.status(404).json({error:'Categoria não encontrada!'})
        }
        return res.status(500).json({error:'Erro ao deletar categoria!'})
    }

}

const updateCategoriaHandler = async (req, res) => {
  const { id_categoria } = req.params;
  const { nome } = req.body;

  try {
    const categoriaAtualizada = await updateCategoria(Number(id_categoria), nome);
    return res.status(200).json(categoriaAtualizada);
  } catch (error) {
    console.error(error);

    if (error.message === "Categoria não encontrada") {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
};




module.exports = {
    getAllCategoriasTotais,
    getCategoriaByIdHandler,
    createCategoriaHandler,
    deleteCategoriaHandler,
    updateCategoriaHandler
}