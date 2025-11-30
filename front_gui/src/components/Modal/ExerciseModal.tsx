// front_gui/src/components/Modal/ExerciseModal.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Exercise {
  name: string;
  details: string;
  completed: boolean;
}

interface ExerciseModalProps {
  onClose: () => void;
  onAdd: (exercise: Exercise, editIndex?: number) => void;
  editExercise?: Exercise | null;
  editIndex?: number | null;
}

export default function ExerciseModal({ onClose, onAdd, editExercise, editIndex }: ExerciseModalProps) {
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    details: "",
    completed: false,
  });

  useEffect(() => {
    if (editExercise) {
      setExercise(editExercise);
    }
  }, [editExercise]);

  const handleSave = () => {
    if (!exercise.name || !exercise.details) {
      alert("Preencha todos os campos do exercício!");
      return;
    }
    onAdd(exercise, editIndex ?? undefined);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{editExercise ? "Editar Exercício" : "Adicionar Exercício"}</h2>

        <input
          type="text"
          placeholder="Nome do exercício"
          value={exercise.name}
          onChange={e => setExercise({ ...exercise, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Detalhes (ex: Séries: 3, Reps: 12)"
          value={exercise.details}
          onChange={e => setExercise({ ...exercise, details: e.target.value })}
        />

        <button type="button" onClick={handleSave}>
          {editExercise ? "Salvar Alterações" : "Adicionar"}
        </button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </div>

      <style>{`
        .modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; }
        .modal { background:white; padding:20px; border-radius:8px; width:400px; max-width:90%; }
        input { width:100%; margin-bottom:10px; padding:5px; }
        button { margin-right:5px; padding:5px 10px; }
      `}</style>
    </div>
  );
}
