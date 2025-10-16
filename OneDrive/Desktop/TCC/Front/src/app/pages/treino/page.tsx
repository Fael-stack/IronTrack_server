"use client";
import React, { useState, useEffect } from "react";
import TreinoModal from "@/components/Modal/TreinoModal";

interface Exercise {
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

  // Carregar treinos do banco
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Nenhum token encontrado. Usuário precisa logar.");
      return;
    }

    fetch("http://localhost:4000/treinos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error("Erro do servidor:", data.error);
          setTreinos([]);
        } else if (Array.isArray(data)) {
          // Garantir que exercises seja sempre array
          const normalized = data.map((t: any) => ({
            ...t,
            exercises: Array.isArray(t.exercises) ? t.exercises : [],
          }));
          setTreinos(normalized);
        } else {
          console.error("Retorno inesperado:", data);
          setTreinos([]);
        }
      })
      .catch(err => {
        console.error(err);
        setTreinos([]);
      });
  }, []);

  // Função para salvar treino (novo ou editado)
  const handleSaveTreino = async (treinoInput: Omit<Treino, "_id">) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado.");

      let response;
      if (editTreino && currentTreinoIndex !== null) {
        // Editar treino existente
        response = await fetch(`http://localhost:4000/treinos/${editTreino._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(treinoInput),
        });
      } else {
        // Criar treino novo
        response = await fetch("http://localhost:4000/treinos", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(treinoInput),
        });
      }

      const savedTreino = await response.json();
      if (!response.ok) throw new Error(savedTreino.error || "Erro ao salvar treino");

      if (editTreino && currentTreinoIndex !== null) {
        const updatedTreinos = [...treinos];
        updatedTreinos[currentTreinoIndex] = { ...savedTreino, exercises: savedTreino.exercises || [] };
        setTreinos(updatedTreinos);
      } else {
        setTreinos(prev => [...prev, { ...savedTreino, exercises: savedTreino.exercises || [] }]);
      }

      setEditTreino(null);
      setCurrentTreinoIndex(null);
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const toggleExerciseCompletion = async (treinoIdx: number, exIdx: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const updatedTreinos = [...treinos];
    const exercise = updatedTreinos[treinoIdx].exercises[exIdx];
    exercise.completed = !exercise.completed;

    setTreinos(updatedTreinos);

    // Atualiza no banco
    try {
      await fetch(`http://localhost:4000/treinos/${updatedTreinos[treinoIdx]._id}/exercises/${exIdx}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const calculateProgress = (treino: Treino) => {
    const exercises = treino.exercises || [];
    if (exercises.length === 0) return 0;
    const completed = exercises.filter(ex => ex.completed).length;
    return Math.round((completed / exercises.length) * 100);
  };

  const deleteTreino = async (idx: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const treinoToDelete = treinos[idx];
    try {
      await fetch(`http://localhost:4000/treinos/${treinoToDelete._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTreinos(prev => prev.filter((_, i) => i !== idx));
    } catch (err) {
      console.error(err);
    }
  };

  const editExistingTreino = (idx: number) => {
    setEditTreino(treinos[idx]);
    setCurrentTreinoIndex(idx);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <h1>Seus Treinos</h1>

      {treinos?.map((t, idx) => (
        <div key={idx} className="treino-card">
          <div className="treino-header">
            <h2 className={calculateProgress(t) === 100 ? "completed" : ""}>{t.name}</h2>
            <span>{calculateProgress(t)}%</span>
          </div>

          <p>{t.day_time} - {t.week_day}</p>

          <ul>
            {(t.exercises || []).map((ex, i) => (
              <li key={i} className="exercise-item">
                <span className={ex.completed ? "completed" : ""}>{ex.name} ({ex.details})</span>
                <button onClick={() => toggleExerciseCompletion(idx, i)}>
                  {ex.completed ? "Desmarcar" : "Completo"}
                </button>
              </li>
            ))}
          </ul>

          <div className="treino-actions">
            <button onClick={() => editExistingTreino(idx)}>Editar</button>
            <button onClick={() => deleteTreino(idx)}>Deletar</button>
          </div>
        </div>
      ))}

      <button className="create-btn" onClick={() => setModalOpen(true)}>Criar Treino</button>

      {modalOpen && (
        <TreinoModal
          onClose={() => { setModalOpen(false); setEditTreino(null); setCurrentTreinoIndex(null); }}
          onSave={handleSaveTreino}
          editTreino={editTreino}
        />
      )}

      <style>{`
        .container { max-width: 800px; margin: auto; padding: 20px; }
        h1 { text-align: center; margin-bottom: 20px; }
        .treino-card { border: 1px solid #ccc; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #f9f9f9; }
        .treino-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .completed { text-decoration: line-through; color: gray; }
        ul { list-style: disc; padding-left: 20px; }
        .exercise-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .treino-actions { margin-top: 10px; display: flex; gap: 10px; }
        .treino-actions button, .create-btn, .exercise-item button { cursor: pointer; padding: 5px 10px; border: none; border-radius: 4px; }
        .treino-actions button { background: #ffcc00; }
        .treino-actions button:nth-child(2) { background: #ff4444; color: white; }
        .create-btn { margin-top: 15px; background: #007bff; color: white; }
        .exercise-item button { background: #007bff; color: white; }
      `}</style>
    </div>
  );
}
