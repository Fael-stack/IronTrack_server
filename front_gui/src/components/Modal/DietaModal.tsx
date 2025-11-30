// front_gui/src/components/Modal/DietaModal.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Dieta {
  _id?: string;
  name: string;
  day_time: string;
  week_day: string;
  macronutrients: string[];
  kcal: number;
  ingredients: string[];
}

interface DietaModalProps {
  editDieta?: Dieta | null;
  onClose: () => void;
  onSave: (data: Omit<Dieta, "_id">) => void;
}

const diasDaSemana = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"];

const DietaModal: React.FC<DietaModalProps> = ({ editDieta, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Dieta, "_id">>({
    name: "",
    day_time: "",
    week_day: "",
    macronutrients: [],
    kcal: 0,
    ingredients: [],
  });

  useEffect(() => {
    if (editDieta) {
      setFormData({
        name: editDieta.name || "",
        day_time: editDieta.day_time || "",
        week_day: editDieta.week_day || "",
        macronutrients: editDieta.macronutrients || [],
        kcal: editDieta.kcal || 0,
        ingredients: editDieta.ingredients || [],
      });
    }
  }, [editDieta]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "kcal") setFormData(prev => ({ ...prev, [name]: Number(value) }));
    else setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: "macronutrients" | "ingredients", value: string) => {
    const array = value.split(",").map(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editDieta ? "Editar Dieta" : "Nova Dieta"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome da dieta"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            placeholder="Hora do dia"
            name="day_time"
            value={formData.day_time}
            onChange={handleChange}
            required
          />

          <select name="week_day" value={formData.week_day} onChange={handleChange} required>
            <option value="">Selecione o dia</option>
            {diasDaSemana.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <input
            type="text"
            placeholder="Macronutrientes (separados por vírgula)"
            value={formData.macronutrients.join(", ")}
            onChange={e => handleArrayChange("macronutrients", e.target.value)}
          />

          <input
            type="text"
            placeholder="Ingredientes (separados por vírgula)"
            value={formData.ingredients.join(", ")}
            onChange={e => handleArrayChange("ingredients", e.target.value)}
          />

          <input
            type="number"
            placeholder="Calorias totais (kcal)"
            name="kcal"
            value={formData.kcal}
            onChange={handleChange}
            required
            min={0}
          />

          <div className="modal-actions">
            <button type="submit">{editDieta ? "Salvar Alterações" : "Criar Dieta"}</button>
            <button type="button" onClick={onClose} className="cancel">Cancelar</button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay { position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1000; }
        .modal { background:white; padding:20px; border-radius:8px; width:400px; max-width:90%; display:flex; flex-direction:column; gap:10px; }
        input, select { width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; }
        .modal-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:10px; }
        .modal-actions button { padding:8px 12px; border:none; border-radius:4px; cursor:pointer; }
        .modal-actions .cancel { background:#ccc; }
        .modal-actions button[type="submit"] { background:#007bff; color:white; }
      `}</style>
    </div>
  );
};

export default DietaModal;
