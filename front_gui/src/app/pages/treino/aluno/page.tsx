// front_gui/src/app/pages/treino/aluno/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import TreinoModal from "@/components/Modal/TreinoModal";
import styles from "./page.module.css";

interface Exercise {
  _id?: string;
  name: string;
  details: string;
  completed: boolean;
}

interface Treino {
  _id: string | null;
  name: string;
  day_time: string;
  week_day: string;
  exercises: Exercise[];
}

export default function TreinadorPage() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTreino, setEditTreino] = useState<Treino | null>(null);
  const [currentTreinoIndex, setCurrentTreinoIndex] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch("http://localhost:4000/treinos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          const normalized = data.map((t: any) => ({
            ...t,
            exercises: Array.isArray(t.exercises) ? t.exercises : [],
          }));
          setTreinos(normalized);
        } else {
          setTreinos(Array.isArray(data?.treinos) ? data.treinos : []);
        }
      } catch (err) {
        console.error(err);
        setTreinos([]);
      }
    })();
  }, [token]);

  const handleSaveTreino = async (treinoInput: Omit<Treino, "_id">) => {
    if (!token) return;
    try {
      let response;

      if (editTreino && currentTreinoIndex !== null) {
        response = await fetch(`http://localhost:4000/treinos/${editTreino._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(treinoInput),
        });
      } else {
        response = await fetch("http://localhost:4000/treinos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(treinoInput),
        });
      }

      const savedTreino = await response.json();
      if (!response.ok) throw new Error(savedTreino.error || "Erro ao salvar treino");

      if (editTreino && currentTreinoIndex !== null) {
        const updated = [...treinos];
        updated[currentTreinoIndex] = { ...savedTreino, exercises: savedTreino.exercises || [] };
        setTreinos(updated);
      } else {
        setTreinos(prev => [...prev, { ...savedTreino, exercises: savedTreino.exercises || [] }]);
      }

      setEditTreino(null);
      setCurrentTreinoIndex(null);
      setModalOpen(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleExerciseCompletion = async (treinoIdx: number, exIdx: number) => {
    if (!token) return;

    const updated = [...treinos];
    const exercise = updated[treinoIdx].exercises[exIdx];
    exercise.completed = !exercise.completed;
    setTreinos(updated);

    if (!exercise._id) return;

    try {
      await fetch(
        `http://localhost:4000/treinos/${updated[treinoIdx]._id}/exercises/${exercise._id}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {}
  };

  const calculateProgress = (treino: Treino) => {
    const list = treino.exercises || [];
    if (list.length === 0) return 0;
    return Math.round((list.filter(e => e.completed).length / list.length) * 100);
  };

  const deleteTreino = async (idx: number) => {
    if (!token) return;
    try {
      await fetch(`http://localhost:4000/treinos/${treinos[idx]._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTreinos(prev => prev.filter((_, i) => i !== idx));
    } catch (err) {}
  };

  const editExistingTreino = (idx: number) => {
    setEditTreino(treinos[idx]);
    setCurrentTreinoIndex(idx);
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seus Treinos</h1>

      {treinos.map((t, idx) => {
        const progress = calculateProgress(t);
        return (
          <div className={styles.card} key={t._id || idx}>
            <header className={styles.cardHeader}>
              <h2 className={progress === 100 ? styles.completed : ""}>{t.name}</h2>
              <span className={styles.progressTag}>{progress}%</span>
            </header>

            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>

            <p className={styles.cardSub}>{t.day_time} — {t.week_day}</p>

            <ul className={styles.exerciseList}>
              {t.exercises.map((ex, i) => (
                <li className={styles.exerciseItem} key={ex._id || i}>
                  <span className={ex.completed ? styles.completed : ""}>
                    {ex.name} — {ex.details}
                  </span>

                  <button
                    className={styles.exerciseBtn}
                    onClick={() => toggleExerciseCompletion(idx, i)}
                  >
                    {ex.completed ? "Desmarcar" : "Completo"}
                  </button>
                </li>
              ))}
            </ul>

            <footer className={styles.cardActions}>
              <button className={styles.actionBtn} onClick={() => editExistingTreino(idx)}>Editar</button>
              <button
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                onClick={() => deleteTreino(idx)}
              >
                Deletar
              </button>
            </footer>
          </div>
        );
      })}

      <button className={styles.createBtn} onClick={() => setModalOpen(true)}>
        Criar Treino
      </button>

      {modalOpen && (
        <TreinoModal
          onClose={() => {
            setModalOpen(false);
            setEditTreino(null);
            setCurrentTreinoIndex(null);
          }}
          onSave={handleSaveTreino}
          editTreino={editTreino}
        />
      )}
    </div>
  );
}
