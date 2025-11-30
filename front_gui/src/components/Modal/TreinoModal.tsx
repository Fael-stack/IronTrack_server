// front_gui/src/components/Modal/TreinoModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import ExerciseModal from "./ExerciseModal";

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

interface TreinoModalProps {
  editTreino?: Treino | null;
  onClose: () => void;
  onSave?: (treino: Omit<Treino, "_id">) => void;
}

const diasDaSemana = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"];

export default function TreinoModal({ editTreino, onClose, onSave }: TreinoModalProps) {
  const [treino, setTreino] = useState<Treino>({
    name: "",
    day_time: "",
    week_day: "",
    exercises: [],
  });

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editExercise, setEditExercise] = useState<{ exercise: Exercise; index: number } | null>(null);

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

  const handleSave = async () => {
    if (!treino.name || !treino.day_time || !treino.week_day) {
      alert("Preencha todos os campos!");
      return;
    }

    if (onSave) {
      onSave({
        name: treino.name,
        day_time: treino.day_time,
        week_day: treino.week_day,
        exercises: treino.exercises,
      });
      onClose();
      return;
    }
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return alert("Você precisa estar logado.");

      let response;
      if (treino._id) {
        response = await fetch(`http://localhost:4000/treinos/${treino._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            name: treino.name,
            day_time: treino.day_time,
            week_day: treino.week_day,
            exercises: treino.exercises,
          }),
        });
      } else {
        response = await fetch("http://localhost:4000/treinos", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            name: treino.name,
            day_time: treino.day_time,
            week_day: treino.week_day,
            exercises: treino.exercises,
          }),
        });
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao salvar treino");
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro desconhecido");
    }
  };

  const completedCount = treino.exercises.filter(ex => ex.completed).length;
  const completionPercent = treino.exercises.length ? Math.round((completedCount / treino.exercises.length) * 100) : 0;

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal">
          <h2 style={{ textDecoration: completionPercent === 100 ? "line-through" : "none" }}>
            {editTreino ? "Editar Treino" : "Criar Treino"} - {completionPercent}%
          </h2>

          <input type="text" placeholder="Nome do treino" value={treino.name} onChange={e => setTreino({ ...treino, name: e.target.value })} />
          <input type="time" value={treino.day_time} onChange={e => setTreino({ ...treino, day_time: e.target.value })} />
          <select value={treino.week_day} onChange={e => setTreino({ ...treino, week_day: e.target.value })}>
            <option value="">Selecione o dia</option>
            {diasDaSemana.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <h3>Exercícios</h3>
          <ul>
            {treino.exercises.map((ex, idx) => (
              <li key={idx} style={{ textDecoration: ex.completed ? "line-through" : "none" }}>
                <strong>{ex.name}</strong> ({ex.details})
                <div style={{ display: "inline-block", marginLeft: 8 }}>
                  <button onClick={() => toggleCompleted(idx)}>{ex.completed ? "Marcar Incompleto" : "Marcar Completo"}</button>
                  <button onClick={() => { setEditExercise({ exercise: ex, index: idx }); setShowExerciseModal(true); }}>Editar</button>
                  <button onClick={() => handleDeleteExercise(idx)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 8 }}>
            <button onClick={() => setShowExerciseModal(true)}>Adicionar Exercício</button>
            <button onClick={handleSave}>Salvar Treino</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>

      {showExerciseModal && (
        <ExerciseModal
          onClose={() => { setShowExerciseModal(false); setEditExercise(null); }}
          onAdd={(exercise, idx) => handleAddExercise(exercise, idx)}
          editExercise={editExercise?.exercise ?? null}
          editIndex={editExercise?.index ?? null}
        />
      )}

      <style>{`
        .modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; }
        .modal { background:white; padding:20px; border-radius:8px; width:500px; max-width:95%; max-height:90vh; overflow:auto; }
        input, select { width:100%; margin-bottom:10px; padding:8px; }
        button { margin-right:6px; margin-top:6px; padding:6px 10px; }
        ul { list-style: none; padding-left: 0; }
        li { margin-bottom:8px; }
      `}</style>
    </>
  );
}
