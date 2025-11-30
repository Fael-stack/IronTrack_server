// front_gui/src/app/pages/dieta/treinador/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import DietaModal from "@/components/Modal/DietaModal";
import styles from "./page.module.css";

interface Dieta {
  _id: string;
  name: string;
  day_time: string;
  week_day: string;
  macronutrients: string[];
  kcal: number;
  ingredients: string[];
}

interface Aluno {
  _id: string;
  name: string;
}

export default function DietasTreinadorPage() {
  const [token, setToken] = useState<string | null>(null);
  const [treinadorId, setTreinadorId] = useState<string | null>(null);

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<string>("");

  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDieta, setEditDieta] = useState<Dieta | null>(null);
  const [currentDietaIndex, setCurrentDietaIndex] = useState<number | null>(null);

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    const tid = sessionStorage.getItem("userId");

    if (!t || !tid) return;

    setToken(t);
    setTreinadorId(tid);
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
    if (!selectedAluno || !token) return;

    fetch(`http://localhost:4000/dietas/user/${selectedAluno}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setDietas(data || []));
  }, [selectedAluno, token]);

  const handleSaveDieta = async (dietaInput: Omit<Dieta, "_id">) => {
    try {
      if (!token || !selectedAluno) throw new Error("Treinador não autenticado.");

      let response;

      if (editDieta && currentDietaIndex !== null) {
        response = await fetch(`http://localhost:4000/dietas/${editDieta._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dietaInput),
        });
      } else {
        response = await fetch("http://localhost:4000/dietas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...dietaInput, userId: selectedAluno }),
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
      alert(err.message);
    }
  };

  const editExistingDieta = (idx: number) => {
    setEditDieta(dietas[idx]);
    setCurrentDietaIndex(idx);
    setModalOpen(true);
  };

  const deleteDieta = async (idx: number) => {
    const dieta = dietas[idx];
    if (!token) return;

    const res = await fetch(`http://localhost:4000/dietas/${dieta._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setDietas(prev => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Dietas dos Alunos</h1>

      <div className={styles.selectArea}>
        <label>Selecione um aluno:</label>
        <select
          className={styles.selectInput}
          value={selectedAluno}
          onChange={(e) => setSelectedAluno(e.target.value)}
        >
          <option value="">Escolha um aluno</option>
          {alunos.map(al => (
            <option key={al._id} value={al._id}>
              {al.name}
            </option>
          ))}
        </select>
      </div>

      {selectedAluno && (
        <>
          <h2 className={styles.subTitle}>
            Dietas de {alunos.find(a => a._id === selectedAluno)?.name}
          </h2>

          {dietas.map((dieta, idx) => (
            <div key={dieta._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{dieta.name}</h3>
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

          <button className={styles.createBtn} onClick={() => setModalOpen(true)}>
            Criar Dieta para este aluno
          </button>
        </>
      )}

      {modalOpen && (
        <DietaModal
          editDieta={editDieta}
          onClose={() => {
            setModalOpen(false);
            setEditDieta(null);
            setCurrentDietaIndex(null);
          }}
          onSave={handleSaveDieta}
        />
      )}
    </div>
  );
}
