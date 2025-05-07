import express from "express";
import {
  createAlimento,
  getAlimentos,
  getAlimentoById,
  updateAlimento,
  deleteAlimento,
} from "../controllers/alimentoController.js";

const router = express.Router();

router.post("/", createAlimento);
router.get("/", getAlimentos);
router.get("/:id", getAlimentoById);
router.put("/:id", updateAlimento);
router.delete("/:id", deleteAlimento);

export default router;
