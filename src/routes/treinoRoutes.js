import express from "express";
import {
  createTreino,
  getTreinos,
  getTreinoById,
  updateTreino,
  deleteTreino,
} from "../controllers/treinoController.js";

const router = express.Router();

router.post("/", createTreino);
router.get("/", getTreinos);
router.get("/:id", getTreinoById);
router.put("/:id", updateTreino);
router.delete("/:id", deleteTreino);

export default router;
