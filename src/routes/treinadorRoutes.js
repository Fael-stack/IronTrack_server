import express from "express";
import {
  createTreinador,
  getTreinadores,
  getTreinadorById,
  updateTreinador,
  deleteTreinador,
} from "../controllers/treinadorController.js";

const router = express.Router();

router.post("/", createTreinador);
router.get("/", getTreinadores);
router.get("/:id", getTreinadorById);
router.put("/:id", updateTreinador);
router.delete("/:id", deleteTreinador);

export default router;
