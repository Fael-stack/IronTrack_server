"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Aluno = { _id: string; nome: string };
type Contract = { _id: string; aluno: Aluno | null; status: string };

export default function TreinadorContratosPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [treinadorId, setTreinadorId] = useState(localStorage.getItem("userId") || "");
  const router = useRouter();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await axios.get<Contract[]>("http://localhost:4000/contracts");
        const meusContratos = res.data.filter(c => c.treinador?._id === treinadorId);
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
        <h2>Seus Contratos</h2>
        {contracts.length === 0 && <p>Nenhum contrato ativo.</p>}
        <ul className={styles.contractList}>
          {contracts.map(c => (
            <li key={c._id} className={styles.contractItem}>
              {c.aluno?.nome}
              {c.status === "ativo" && (
                <button onClick={() => abrirChat(c._id)}>Abrir Chat</button>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
