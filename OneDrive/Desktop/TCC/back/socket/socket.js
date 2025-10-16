// socket/socket.js
import { Server } from "socket.io";
import Chat from "../conexao/Chat/ChatSchema.js";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: process.env.FRONT_URL || "http://localhost:3000", methods: ["GET", "POST"] }
  });

  io.on("connection", (socket) => {
    console.log("Usuário conectado:", socket.id);

    // Entrar em sala privada
    socket.on("joinRoom", ({ salaId }) => {
      socket.join(String(salaId));
      console.log(`Usuário entrou na sala ${salaId}`);
    });

    // Enviar mensagem → cria chat caso não exista
    socket.on("sendMessage", async ({ salaId, remetente, remetenteModel, conteudo }) => {
      try {
        let chat = await Chat.findOne({ contract: salaId });
        if (!chat) {
          chat = new Chat({ contract: salaId, mensagens: [] });
        }

        chat.mensagens.push({ remetente, remetenteModel, conteudo });
        await chat.save();

        io.to(String(salaId)).emit("receiveMessage", { remetente, remetenteModel, conteudo, data: new Date() });
      } catch (err) {
        console.error("Erro sendMessage:", err);
      }
    });

    // Carregar histórico
    socket.on("load_chat", async ({ salaId }) => {
      try {
        const chat = await Chat.findOne({ contract: salaId });
        socket.emit("chat_history", chat ? chat.mensagens : []);
      } catch (err) {
        console.error("Erro load_chat:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  });

  return io;
};
