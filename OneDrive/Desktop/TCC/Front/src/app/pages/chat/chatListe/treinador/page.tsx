"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Aluno = { _id: string; nome: string };
type Contract = { _id: string; aluno: Aluno | null; status: string };

export default function TreinadorChatsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const router = useRouter();
  const treinadorId = localStorage.getItem("userId") || "";

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await axios.get<Contract[]>("http://localhost:4000/contracts");
        const meusContratos = res.data.filter(c => c.treinador?._id === treinadorId && c.status === "ativo");
        setContracts(meusContratos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContracts();
  }, [treinadorId]);

  const abrirChat = (contractId: string) => {
    localStorage.setItem("role", "Treinador");
    router.push(`/chat/${contractId}`);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Seus Chats Ativos</h2>
        {contracts.length === 0 && <p>Nenhum contrato ativo.</p>}
        <ul className={styles.contractList}>
          {contracts.map(c => (
            <li key={c._id} className={styles.contractItem}>
              {c.aluno?.nome}
              <button onClick={() => abrirChat(c._id)}>Abrir Chat</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
