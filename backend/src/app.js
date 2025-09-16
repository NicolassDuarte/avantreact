const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require('./routes/authRoutes');
const path = require('path');

// Configuração do CORS
app.use(cors({
  origin: "http://localhost:5173", // porta do Vite
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
app.use("/api/auth", authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota raiz
app.get("/", (req, res) => {
  res.send("API ok!!");
});

module.exports = app;
