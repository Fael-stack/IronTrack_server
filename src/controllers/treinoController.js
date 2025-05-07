import Treino from "../models/Treino.js";

const createTreino = async (req, res) => {
  try {
    const treino = await Treino.create(req.body);
    res.status(201).json(treino);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTreinos = async (req, res) => {
  try {
    const treinos = await Treino.find()
      .populate("id_usu")
      .populate("id_treinador")
      .populate("exercicios.exercicio");
    res.status(200).json(treinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreinoById = async (req, res) => {
  try {
    const treino = await Treino.findById(req.params.id)
      .populate("id_usu")
      .populate("id_treinador")
      .populate("exercicios.exercicio");
    if (!treino)
      return res.status(404).json({ error: "Treino não encontrado" });
    res.status(200).json(treino);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTreino = async (req, res) => {
  try {
    const treino = await Treino.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!treino)
      return res.status(404).json({ error: "Treino não encontrado" });
    res.status(200).json(treino);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTreino = async (req, res) => {
  try {
    const treino = await Treino.findByIdAndDelete(req.params.id);
    if (!treino)
      return res.status(404).json({ error: "Treino não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createTreino, getTreinos, getTreinoById, updateTreino, deleteTreino };
