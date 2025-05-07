import express from "express";
import {
  createExercicio,
  getExercicios,
  getExercicioById,
  updateExercicio,
  deleteExercicio,
} from "../controllers/exercicioController.js";

const router = express.Router();

router.post("/", createExercicio);
router.get("/", getExercicios);
router.get("/:id", getExercicioById);
router.put("/:id", updateExercicio);
router.delete("/:id", deleteExercicio);

export default router;
