"use client";
import React, { useState, useEffect } from "react";
import ExerciseModal from "./ExerciseModal";

interface Exercise {
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

interface TreinoModalProps {
  onClose: () => void;
  onSave?: (treino: Treino) => void; // opcional, se quiser manipular localmente
  editTreino?: Treino | null;
}

const diasDaSemana = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"];

export default function TreinoModal({ onClose, onSave, editTreino }: TreinoModalProps) {
  const [treino, setTreino] = useState<Treino>({
    name: "",
    day_time: "",
    week_day: "",
    exercises: [],
  });

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editExercise, setEditExercise] = useState<{exercise: Exercise, index: number} | null>(null);

  useEffect(() => {
    if (editTreino) setTreino(editTreino);
  }, [editTreino]);

  const handleAddExercise = (exercise: Exercise, idx?: number) => {
    if (idx !== undefined) {
      const updated = [...treino.exercises];
      updated[idx] = exercise;
      setTreino(prev => ({ ...prev, exercises: updated }));
    } else {
      setTreino(prev => ({ ...prev, exercises: [...prev.exercises, exercise] }));
    }
  };

  const handleDeleteExercise = (idx: number) => {
    const updated = [...treino.exercises];
    updated.splice(idx, 1);
    setTreino(prev => ({ ...prev, exercises: updated }));
  };

  const toggleCompleted = (idx: number) => {
    const updated = [...treino.exercises];
    updated[idx].completed = !updated[idx].completed;
    setTreino(prev => ({ ...prev, exercises: updated }));
  };

  // ✅ Função de salvar treino com envio ao backend incluindo token
  const handleSave = async () => {
    if (!treino.name || !treino.day_time || !treino.week_day) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado para salvar um treino.");
        return;
      }

      const response = await fetch("http://localhost:4000/treinos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <- token JWT
        },
        body: JSON.stringify({
          name: treino.name,
          day_time: treino.day_time,
          week_day: treino.week_day,
          exercises: treino.exercises,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao salvar treino");
      }

      // Se quiser manipular localmente
      if (onSave) onSave(data);

      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro desconhecido ao salvar treino");
    }
  };

  const completedCount = treino.exercises.filter(ex => ex.completed).length;
  const completionPercent = treino.exercises.length ? Math.round((completedCount / treino.exercises.length) * 100) : 0;

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <h2 style={{textDecoration: completionPercent === 100 ? "line-through" : "none"}}>
            {editTreino ? "Editar Treino" : "Criar Treino"} - {completionPercent}%
          </h2>

          <input type="text" placeholder="Nome do treino" value={treino.name} onChange={e => setTreino({...treino, name: e.target.value})}/>
          <input type="time" value={treino.day_time} onChange={e => setTreino({...treino, day_time: e.target.value})}/>
          <select value={treino.week_day} onChange={e => setTreino({...treino, week_day: e.target.value})}>
            <option value="">Selecione o dia</option>
            {diasDaSemana.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <h3>Exercícios</h3>
          <ul>
            {treino.exercises.map((ex, idx) => (
              <li key={idx} style={{textDecoration: ex.completed ? "line-through" : "none"}}>
                <strong>{ex.name}</strong> ({ex.details}) 
                <button onClick={() => toggleCompleted(idx)}>
                  {ex.completed ? "Marcar Incompleto" : "Marcar Completo"}
                </button>
                <button onClick={() => { setEditExercise({exercise: ex, index: idx}); setShowExerciseModal(true); }}>Editar</button>
                <button onClick={() => handleDeleteExercise(idx)}>Excluir</button>
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => setShowExerciseModal(true)}>Adicionar Exercício</button>
          <button type="button" onClick={handleSave}>Salvar Treino</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </div>

      {showExerciseModal && (
        <ExerciseModal 
          onClose={() => { setShowExerciseModal(false); setEditExercise(null); }}
          onAdd={handleAddExercise}
          editExercise={editExercise?.exercise ?? null}
          editIndex={editExercise?.index ?? null}
        />
      )}

      <style>{`
        .modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; }
        .modal { background:white; padding:20px; border-radius:8px; width:400px; max-width:90%; }
        input, select { width:100%; margin-bottom:10px; padding:5px; }
        button { margin-right:5px; padding:5px 10px; margin-top:5px; }
        ul { list-style: disc; padding-left: 20px; }
        li { margin-bottom: 5px; }
      `}</style>
    </>
  );
}
