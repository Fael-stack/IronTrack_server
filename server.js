// server.js
import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { setupSocket } from "./socket/socket.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";


// Rotas
import alunoRoutes from "./routes/alunoRoutes.js";
import treinadorRoutes from "./routes/treinadorRoutes.js";
import treinoRoutes from "./routes/treinoRoutes.js";
import dietaRoutes from "./routes/dietaRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutesTreinador from "./routes/authRoutesTreinador.js";
import authRoutesAlunos from "./routes/authRoutesAluno.js";
import treinoTreinadorRoutes from "./routes/treinoTreinadorRoutes.js";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: process.env.FRONT_URL || "*" }));
app.use(express.json());

// Rotas
app.use("/alunos", alunoRoutes);
app.use("/treinadores", treinadorRoutes);
app.use("/treinos", treinoRoutes);
app.use("/dietas", authMiddleware, dietaRoutes);
app.use("/contracts", contractRoutes);
app.use("/chats", chatRoutes);
app.use("/treinadores/auth", authRoutesTreinador);
app.use("/alunos/auth", authRoutesAlunos);
app.use("/treinos/treinador", treinoTreinadorRoutes);


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/iron_track_server";
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    
    setupSocket(server);
    
    app.get("/", (req, res) => res.send("API IronTrack funcionando 🚀"));
    server.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("Erro ao conectar MongoDB:", err);
    process.exit(1);
  });
