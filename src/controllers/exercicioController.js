import Exercicio from "../models/Exercicio.js";

const createExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.create(req.body);
    res.status(201).json(exercicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getExercicios = async (req, res) => {
  try {
    const exercicios = await Exercicio.find();
    res.status(200).json(exercicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExercicioById = async (req, res) => {
  try {
    const exercicio = await Exercicio.findById(req.params.id);
    if (!exercicio)
      return res.status(404).json({ error: "Exercício não encontrado" });
    res.status(200).json(exercicio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!exercicio)
      return res.status(404).json({ error: "Exercício não encontrado" });
    res.status(200).json(exercicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExercicio = async (req, res) => {
  try {
    const exercicio = await Exercicio.findByIdAndDelete(req.params.id);
    if (!exercicio)
      return res.status(404).json({ error: "Exercício não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createExercicio,
  getExercicios,
  getExercicioById,
  updateExercicio,
  deleteExercicio,
};
