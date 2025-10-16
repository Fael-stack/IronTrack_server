"use client";
import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface Message {
  remetente: string;
  remetenteModel: "Aluno" | "Treinador";
  conteudo: string;
  data: string;
}

interface ChatRoomProps {
  salaId: string;       // ID do contrato
  role: "Aluno" | "Treinador"; // Função do usuário
  userId: string;
}

let socket: Socket;

const ChatRoom: React.FC<ChatRoomProps> = ({ salaId, role, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.emit("joinRoom", { salaId });
    socket.emit("load_chat", { salaId });

    socket.on("chat_history", (history: Message[]) => {
      setMessages(history);
      scrollToBottom();
    });

    socket.on("receiveMessage", (msg: Message) => {
      setMessages(prev => [...prev, msg]);
      scrollToBottom();
    });

    return () => socket.disconnect();
  }, [salaId]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;

    socket.emit("sendMessage", { salaId, remetente: userId, remetenteModel: role, conteudo: newMsg });
    setNewMsg("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", height: "80vh", border: "1px solid #ccc", padding: 10 }}>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.remetente === userId ? "right" : "left", margin: "5px 0" }}>
            <span style={{ background: msg.remetente === userId ? "#a0e1e0" : "#eee", padding: "5px 10px", borderRadius: 10, display: "inline-block" }}>
              {msg.conteudo}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Digite sua mensagem..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 20px" }}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatRoom;
