import express from "express";
import {
  createDieta,
  getDietas,
  getDietaById,
  updateDieta,
  deleteDieta,
} from "../controllers/dietaController.js";

const router = express.Router();

router.post("/", createDieta);
router.get("/", getDietas);
router.get("/:id", getDietaById);
router.put("/:id", updateDieta);
router.delete("/:id", deleteDieta);

export default router;
