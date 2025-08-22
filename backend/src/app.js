import express from "express";
const app = express();

app.use(express.json());

app.get("/", (res, req) => {
  res.setEncoding("api ok!!");
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/usuarios/:id/trocas", trocasRoutes);
app.use(itemRoutes);

module.exports = app;
