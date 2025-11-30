//back_gui\server.js
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
import treinoTreinadorRoutes from "./routes/treinoTreinadorRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import authMe from "./routes/authMe.js";

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
app.use("/treinos/treinador", treinoTreinadorRoutes);
app.use("/offers", offerRoutes);
app.use("/auth", authMe);

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
