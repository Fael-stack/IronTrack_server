"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatRoom from "../../../components/ChatRoom/ChatRoom";

const ChatPage = () => {
  const params = useParams();
  const salaId = params.salaId as string;
  const [role, setRole] = useState<"Aluno" | "Treinador" | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as "Aluno" | "Treinador" | null;
    const storedUserId = localStorage.getItem("userId");
    setRole(storedRole);
    setUserId(storedUserId);
  }, []);

  if (!role || !userId) return <p>Carregando chat...</p>;

  return <ChatRoom salaId={salaId} role={role} userId={userId} />;
};

export default ChatPage;
