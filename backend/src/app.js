const express = require("express");
const app = express();
app.use(express.json());

// Importando rotas
const categoriasRoutes = require("./routes/categoriasRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const trocasRoutes = require("./routes/trocaRoutes");
const itensRoutes = require("./routes/itemRoutes");

// Registrando rotas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/trocas", trocasRoutes);
app.use("/api/itens", itensRoutes);
app.use("/api/categorias", categoriasRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.send("API ok!!");
});

module.exports = app;
