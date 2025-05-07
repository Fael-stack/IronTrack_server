import Alimento from "../models/Alimento.js";

const createAlimento = async (req, res) => {
  try {
    const alimento = await Alimento.create(req.body);
    res.status(201).json(alimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAlimentos = async (req, res) => {
  try {
    const alimentos = await Alimento.find();
    res.status(200).json(alimentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAlimentoById = async (req, res) => {
  try {
    const alimento = await Alimento.findById(req.params.id);
    if (!alimento)
      return res.status(404).json({ error: "Alimento não encontrado" });
    res.status(200).json(alimento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAlimento = async (req, res) => {
  try {
    const alimento = await Alimento.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!alimento)
      return res.status(404).json({ error: "Alimento não encontrado" });
    res.status(200).json(alimento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAlimento = async (req, res) => {
  try {
    const alimento = await Alimento.findByIdAndDelete(req.params.id);
    if (!alimento)
      return res.status(404).json({ error: "Alimento não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createAlimento,
  getAlimentos,
  getAlimentoById,
  updateAlimento,
  deleteAlimento,
};
