import Treinador from '../models/treinador.js';

const createTreinador = async (req, res) => {
  try {
    const treinador = await Treinador.create(req.body);
    res.status(201).json(treinador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTreinadores = async (req, res) => {
  try {
    const treinadores = await Treinador.find();
    res.status(200).json(treinadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTreinadorById = async (req, res) => {
  try {
    const treinador = await Treinador.findById(req.params.id);
    if (!treinador) return res.status(404).json({ error: 'Treinador não encontrado' });
    res.status(200).json(treinador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTreinador = async (req, res) => {
  try {
    const treinador = await Treinador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!treinador) return res.status(404).json({ error: 'Treinador não encontrado' });
    res.status(200).json(treinador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTreinador = async (req, res) => {
  try {
    const treinador = await Treinador.findByIdAndDelete(req.params.id);
    if (!treinador) return res.status(404).json({ error: 'Treinador não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createTreinador,
  getTreinadores,
  getTreinadorById,
  updateTreinador,
  deleteTreinador
};
