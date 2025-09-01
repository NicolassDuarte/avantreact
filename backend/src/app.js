const express = require("express");
const app = express();
app.use(express.json());
const categoriasRoutes = require("./routes/categoriasRoutes.js")
const usuarioRoutes = require('./routes/usuarioRoutes')




app.use("/api/usuarios", usuarioRoutes);
//app.use("/api/usuarios/:id/trocas", trocasRoutes);
//app.use(itemRoutes);
app.use("/categorias", categoriasRoutes);

app.use("/api", usuarioRoutes);

app.get("/", (req, res) => {
  res.send("api ok!!");
});

module.exports = app;
