import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Importando rotas
import alunoRoutes from "./routes/alunoRoutes.js";
import treinadorRoutes from "./routes/treinadorRoutes.js";
import treinoRoutes from "./routes/treinoRoutes.js";
import dietaRoutes from "./routes/dietaRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutesTreinador from "./routes/authRoutesTreinador.js";
import authRoutesAlunos from "./routes/authRoutesAluno.js";


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/iron_track_server");

// Rota base
app.get("/", (req, res) => {
  res.send("API IronTrack funcionando 🚀");
});

// Usando as rotas
app.use("/alunos", alunoRoutes);
app.use("/treinadores", treinadorRoutes);
app.use("/treinos", treinoRoutes);
app.use("/dietas", dietaRoutes);
app.use("/contracts", contractRoutes);
app.use("/chats", chatRoutes);
app.use("/treinadores/auth", authRoutesTreinador); // todas as rotas de login ficarão aqui
app.use("/alunos/auth", authRoutesAlunos);

app.listen(4000, () => {
  console.log("Servidor rodando em http://localhost:4000");
});
