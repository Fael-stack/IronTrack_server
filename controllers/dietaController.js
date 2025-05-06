import Dieta from '../models/Dieta.js';

const createDieta = async (req, res) => {
  try {
    const dieta = await Dieta.create(req.body);
    res.status(201).json(dieta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDietas = async (req, res) => {
  try {
    const dietas = await Dieta.find().populate('id_usu').populate('alimentos.alimento');
    res.status(200).json(dietas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDietaById = async (req, res) => {
  try {
    const dieta = await Dieta.findById(req.params.id).populate('id_usu').populate('alimentos.alimento');
    if (!dieta) return res.status(404).json({ error: 'Dieta não encontrada' });
    res.status(200).json(dieta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDieta = async (req, res) => {
  try {
    const dieta = await Dieta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dieta) return res.status(404).json({ error: 'Dieta não encontrada' });
    res.status(200).json(dieta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDieta = async (req, res) => {
  try {
    const dieta = await Dieta.findByIdAndDelete(req.params.id);
    if (!dieta) return res.status(404).json({ error: 'Dieta não encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createDieta,
  getDietas,
  getDietaById,
  updateDieta,
  deleteDieta
};