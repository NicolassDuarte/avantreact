import express from "express";
const app = express();
const categoriasRoutes = reuqire("./routes/categoriasRoutes.js")
const usuarioRoutes = require('./routes/usuarioRoutes')

app.use(express.json());


app.use("/api/usuarios", usuarioRoutes);
app.use("/api/usuarios/:id/trocas", trocasRoutes);
app.use(itemRoutes);
app.use("/categorias", categoriaRoutes);

app.use("/api", usuarioRoutes);

app.get("/", (res, req) => {
  res.setEncoding("api ok!!");
});

module.exports = app;
