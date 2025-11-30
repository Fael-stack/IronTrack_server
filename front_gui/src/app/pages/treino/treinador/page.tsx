// front_gui/src/app/pages/treino/treinador/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import TreinoModal from "@/components/Modal/TreinoModal";
import styles from "./page.module.css";

interface Exercise {
    _id?: string;
    name: string;
    details: string;
    completed: boolean;
}

interface Treino {
    _id?: string | null;
    name: string;
    day_time: string;
    week_day: string;
    exercises: Exercise[];
}

interface Aluno {
    _id: string;
    name: string;
}

export default function TreinosTreinadorPage() {
    const [token, setToken] = useState<string | null>(null);
    const [treinadorId, setTreinadorId] = useState<string | null>(null);

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [selectedAluno, setSelectedAluno] = useState<string>("");

    const [treinos, setTreinos] = useState<Treino[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editTreino, setEditTreino] = useState<Treino | null>(null);
    const [currentTreinoIndex, setCurrentTreinoIndex] = useState<number | null>(null);

    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
        setTreinadorId(sessionStorage.getItem("userId"));
    }, []);

    useEffect(() => {
  if (!token || !treinadorId) return;

  (async () => {
    try {
      const res = await fetch(`http://localhost:4000/contracts/treinador/${treinadorId}/alunos`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const txt = await res.text();
        console.warn('GET /contracts/treinador/:treinadorId/alunos ->', res.status, txt);
        setAlunos([]);
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) setAlunos(data);
      else setAlunos([]);
    } catch (err) {
      console.error("Erro ao buscar alunos (treinador):", err);
      setAlunos([]);
    }
  })();
}, [token, treinadorId]);


    useEffect(() => {
        if (!token || !selectedAluno) return;

        (async () => {
            try {
                const res = await fetch(`http://localhost:4000/treinos/treinador/user/${selectedAluno}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                if (Array.isArray(data)) setTreinos(data);
                else setTreinos([]);
            } catch {
                setTreinos([]);
            }
        })();
    }, [token, selectedAluno]);

    const handleSaveTreino = async (treinoInput: Omit<Treino, "_id">) => {
        if (!token || !selectedAluno) return alert("Aluno ou token faltando.");

        try {
            let response;
            if (editTreino && currentTreinoIndex !== null && editTreino._id) {
                response = await fetch(`http://localhost:4000/treinos/treinador/${editTreino._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...treinoInput, userId: selectedAluno }),
                });
            } else {
                response = await fetch("http://localhost:4000/treinos/treinador", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...treinoInput, userId: selectedAluno }),
                });
            }

            const saved = await response.json();
            if (!response.ok) throw new Error(saved.error || "Erro ao salvar treino.");

            if (editTreino && currentTreinoIndex !== null) {
                const updated = [...treinos];
                updated[currentTreinoIndex] = saved;
                setTreinos(updated);
            } else {
                setTreinos(prev => [...prev, saved]);
            }

            setEditTreino(null);
            setCurrentTreinoIndex(null);
            setModalOpen(false);
        } catch (err: any) {
            alert(err.message || "Erro desconhecido.");
        }
    };

    const editExistingTreino = (idx: number) => {
        setEditTreino(treinos[idx]);
        setCurrentTreinoIndex(idx);
        setModalOpen(true);
    };

    const deleteTreino = async (idx: number) => {
        if (!token) return;
        const treino = treinos[idx];
        try {
            const res = await fetch(`http://localhost:4000/treinos/treinador/${treino._id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setTreinos(prev => prev.filter((_, i) => i !== idx));
        } catch {
            alert("Erro ao deletar treino.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Treinos dos Alunos</h1>

            <div className={styles.selectArea}>
                <label>Selecione um aluno:</label>
                <select
                    className={styles.select}
                    value={selectedAluno}
                    onChange={e => setSelectedAluno(e.target.value)}
                >
                    <option value="">Escolha um aluno</option>
                    {alunos.map(a => (
                        <option key={a._id} value={a._id}>
                            {a.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedAluno && (
                <>
                    <h2 className={styles.subtitle}>
                        Treinos de {alunos.find(a => a._id === selectedAluno)?.name}
                    </h2>

                    {treinos.map((t, idx) => {
                        const completed = t.exercises?.filter(e => e.completed).length || 0;
                        const total = t.exercises?.length || 0;
                        const percent = total ? Math.round((completed / total) * 100) : 0;

                        return (
                            <div key={t._id || idx} className={styles.treinoCard}>
                                <div className={styles.treinoHeader}>
                                    <h3>{t.name}</h3>
                                    <span className={styles.percent}>{percent}%</span>
                                </div>

                                <p className={styles.description}>
                                    {t.day_time} — {t.week_day}
                                </p>

                                <ul className={styles.exerciseList}>
                                    {t.exercises.map((ex, i) => (
                                        <li key={ex._id ?? i} className={styles.exerciseItem}>
                                            <span className={ex.completed ? styles.completed : ""}>
                                                {ex.name}
                                            </span>{" "}
                                  
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.actions}>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => editExistingTreino(idx)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteTreino(idx)}
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    <button className={styles.createBtn} onClick={() => setModalOpen(true)}>
                        Criar Treino para este aluno
                    </button>
                </>
            )}

            {modalOpen && (
                <TreinoModal
                    editTreino={editTreino}
                    onClose={() => {
                        setModalOpen(false);
                        setEditTreino(null);
                        setCurrentTreinoIndex(null);
                    }}
                    onSave={handleSaveTreino}
                />
            )}
        </div>
    );
}
