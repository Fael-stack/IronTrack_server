// front_gui/src/app/pages/dieta/aluno/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./Page.module.css";
import DietaModal from "@/components/Modal/DietaModal";

interface Dieta {
  _id: string;
  name: string;
  day_time: string;
  week_day: string;
  macronutrients: string[];
  kcal: number;
  ingredients: string[];
}

export default function DietaPage() {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDieta, setEditDieta] = useState<Dieta | null>(null);
  const [currentDietaIndex, setCurrentDietaIndex] = useState<number | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return console.error("Token não encontrado.");

    fetch("http://localhost:4000/dietas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error("Erro ao buscar dietas:", data.error);
          setDietas([]);
        } else {
          setDietas(data);
        }
      })
      .catch(err => {
        console.error(err);
        setDietas([]);
      });
  }, []);

  const handleSaveDieta = async (dietaInput: Omit<Dieta, "_id">) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado.");

      let response;

      if (editDieta && currentDietaIndex !== null) {
        response = await fetch(`http://localhost:4000/dietas/${editDieta._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(dietaInput),
        });
      } else {
        response = await fetch("http://localhost:4000/dietas", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(dietaInput),
        });
      }

      const saved = await response.json();
      if (!response.ok) throw new Error(saved.error || "Erro ao salvar dieta.");

      if (editDieta && currentDietaIndex !== null) {
        const updated = [...dietas];
        updated[currentDietaIndex] = saved;
        setDietas(updated);
      } else {
        setDietas(prev => [...prev, saved]);
      }

      setEditDieta(null);
      setCurrentDietaIndex(null);
      setModalOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const deleteDieta = async (idx: number) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const dietaDel = dietas[idx];
    try {
      const res = await fetch(`http://localhost:4000/dietas/${dietaDel._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao deletar dieta.");
      setDietas(prev => prev.filter((_, i) => i !== idx));
    } catch (err) {
      console.error(err);
    }
  };

  const editExistingDieta = (idx: number) => {
    setEditDieta(dietas[idx]);
    setCurrentDietaIndex(idx);
    setModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Suas Dietas</h1>

      <div className={styles.dietList}>
        {dietas.map((dieta, idx) => (
          <div key={dieta._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>{dieta.name}</h2>
              <span className={styles.kcal}>{dieta.kcal} kcal</span>
            </div>

            <p className={styles.info}>
              {dieta.day_time} — {dieta.week_day}
            </p>

            <p className={styles.info}>
              <strong>Macros:</strong> {dieta.macronutrients.join(", ")}
            </p>

            <p className={styles.info}>
              <strong>Ingredientes:</strong> {dieta.ingredients.join(", ")}
            </p>

            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => editExistingDieta(idx)}>Editar</button>
              <button className={styles.deleteBtn} onClick={() => deleteDieta(idx)}>Deletar</button>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.createBtn} onClick={() => setModalOpen(true)}>
        Criar Dieta
      </button>

      {modalOpen && (
        <DietaModal
          editDieta={editDieta}
          onClose={() => { setModalOpen(false); setEditDieta(null); setCurrentDietaIndex(null); }}
          onSave={handleSaveDieta}
        />
      )}
    </div>
  );
}
