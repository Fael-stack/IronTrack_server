"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Aluno = { _id: string; nome: string };
type Treinador = { _id: string; nome: string };
type Contract = { _id: string; aluno: Aluno | null; treinador: Treinador | null; status: string };

export default function AlunoContratosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [treinadores, setTreinadores] = useState<Treinador[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const router = useRouter();

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [alunosRes, treinadoresRes, contractsRes] = await Promise.all([
          axios.get<Aluno[]>("http://localhost:4000/alunos"),
          axios.get<Treinador[]>("http://localhost:4000/treinadores"),
          axios.get<Contract[]>("http://localhost:4000/contracts"),
        ]);
        setAlunos(alunosRes.data);
        setTreinadores(treinadoresRes.data);
        setContracts(contractsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Filtrar contratos do aluno selecionado
  const contratosDoAluno = alunoSelecionado
    ? contracts.filter(c => c.aluno?._id === alunoSelecionado._id)
    : [];

  const treinadoresComContrato = contratosDoAluno.map(c => c.treinador).filter(Boolean) as Treinador[];
  const treinadoresSemContrato = treinadores.filter(t => !treinadoresComContrato.some(tc => tc._id === t._id));

  // Criar contrato
  const criarContrato = async (treinadorId: string) => {
    if (!alunoSelecionado) return;
    try {
      const res = await axios.post("http://localhost:4000/contracts", {
        aluno: alunoSelecionado._id,
        treinador: treinadorId,
        status: "ativo",
      });
      setContracts(prev => [...prev, res.data]);

      // Abrir chat automaticamente após criar contrato
      localStorage.setItem("userId", alunoSelecionado._id);
      localStorage.setItem("role", "Aluno");
      router.push(`/chat/${res.data._id}`);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  // Abrir chat de contrato ativo
  const abrirChat = (contractId: string) => {
    if (!alunoSelecionado) return;
    localStorage.setItem("userId", alunoSelecionado._id);
    localStorage.setItem("role", "Aluno");
    router.push(`/chat/${contractId}`);
  };

  // Remover contrato
  const removerContrato = async (contratoId: string) => {
    try {
      await axios.delete(`http://localhost:4000/contracts/${contratoId}`);
      setContracts(contracts.filter(c => c._id !== contratoId));
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2>Alunos</h2>
        <div className={styles.workoutList}>
          {alunos.map(a => (
            <div
              key={a._id}
              className={`${styles.workoutItem} ${alunoSelecionado?._id === a._id ? styles.active : ""}`}
              onClick={() => setAlunoSelecionado(a)}
            >
              {a.nome || "Sem nome"}
            </div>
          ))}
        </div>
      </div>

      <main className={styles.main}>
        {alunoSelecionado ? (
          <div className={styles.contractLists}>
            <div className={styles.contractColumn}>
              <h2>Com contrato</h2>
              <ul className={styles.contractList}>
                {contratosDoAluno.length > 0 ? (
                  contratosDoAluno.map(c =>
                    c.treinador ? (
                      <li key={c._id} className={styles.contractItem}>
                        {c.treinador.nome}
                        {c.status === "ativo" && (
                          <button onClick={() => abrirChat(c._id)}>Abrir Chat</button>
                        )}
                        <button className={styles.removeBtn} onClick={() => removerContrato(c._id)}>
                          Remover
                        </button>
                      </li>
                    ) : null
                  )
                ) : (
                  <li className={styles.emptyState}>Nenhum contrato ainda.</li>
                )}
              </ul>
            </div>

            <div className={styles.contractColumn}>
              <h2>Disponíveis</h2>
              <ul className={styles.contractList}>
                {treinadoresSemContrato.length > 0 ? (
                  treinadoresSemContrato.map(t => (
                    <li key={t._id} className={styles.contractItem}>
                      {t.nome}
                      <button className={styles.addBtn} onClick={() => criarContrato(t._id)}>
                        Adicionar
                      </button>
                    </li>
                  ))
                ) : (
                  <li className={styles.emptyState}>Todos já estão contratados.</li>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>Selecione um aluno para visualizar contratos.</div>
        )}
      </main>
    </div>
  );
}
