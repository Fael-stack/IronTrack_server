"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@/components/Modal"; // seu componente de modal reutilizável
import { getToken, getUser } from "@/utils/auth"; // funções para pegar token e user logado

interface Treino {
  _id: string;
  title: string;
  description: string;
  duration: number; // em minutos
  date: string;
}

const TreinosPage = () => {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedTreino, setSelectedTreino] = useState<Treino | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 0,
    date: "",
  });

  const user = getUser();
  const token = getToken();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchTreinos = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/treinos");
      // filtrar treinos do usuário
      const userTreinos = res.data.filter(
        (t: Treino) => t.userId === user.id
      );
      setTreinos(userTreinos);
    } catch (err) {
      console.error("Erro ao buscar treinos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreinos();
  }, []);

  // ------------------- CREATE -------------------
  const handleCreateTreino = async () => {
    try {
      const res = await axiosInstance.post("/treinos", {
        ...formData,
        userId: user.id,
      });
      setTreinos([...treinos, res.data]);
      setCreateModalOpen(false);
      setFormData({ title: "", description: "", duration: 0, date: "" });
    } catch (err) {
      console.error("Erro ao criar treino:", err);
    }
  };

  // ------------------- EDIT -------------------
  const openEditModal = (treino: Treino) => {
    setSelectedTreino(treino);
    setFormData({
      title: treino.title,
      description: treino.description,
      duration: treino.duration,
      date: treino.date.slice(0, 10), // formato yyyy-mm-dd
    });
    setEditModalOpen(true);
  };

  const handleEditTreino = async () => {
    if (!selectedTreino) return;
    try {
      const res = await axiosInstance.put(`/treinos/${selectedTreino._id}`, formData);
      setTreinos(
        treinos.map((t) => (t._id === selectedTreino._id ? res.data : t))
      );
      setEditModalOpen(false);
      setSelectedTreino(null);
      setFormData({ title: "", description: "", duration: 0, date: "" });
    } catch (err) {
      console.error("Erro ao editar treino:", err);
    }
  };

  // ------------------- DELETE -------------------
  const handleDeleteTreino = async (id: string) => {
    try {
      await axiosInstance.delete(`/treinos/${id}`);
      setTreinos(treinos.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Erro ao deletar treino:", err);
    }
  };

  if (loading) return <p>Carregando treinos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Treinos</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setCreateModalOpen(true)}
      >
        Novo Treino
      </button>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Título</th>
            <th className="border p-2">Descrição</th>
            <th className="border p-2">Duração (min)</th>
            <th className="border p-2">Data</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {treinos.map((treino) => (
            <tr key={treino._id}>
              <td className="border p-2">{treino.title}</td>
              <td className="border p-2">{treino.description}</td>
              <td className="border p-2">{treino.duration}</td>
              <td className="border p-2">{treino.date.slice(0, 10)}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => openEditModal(treino)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteTreino(treino._id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL DE CRIAÇÃO */}
      <Modal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Criar Treino</h2>
        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Descrição"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Duração (min)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          placeholder="Data"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreateTreino}
        >
          Criar
        </button>
      </Modal>

      {/* MODAL DE EDIÇÃO */}
      <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Editar Treino</h2>
        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Descrição"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Duração (min)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          placeholder="Data"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleEditTreino}
        >
          Salvar
        </button>
      </Modal>
    </div>
  );
};

export default TreinosPage;
