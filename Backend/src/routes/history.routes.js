import { Router } from "express";
import { getHistory, setHistory } from "../controllers/history.controller.js";


const router = Router();

router.post("/set", setHistory);
router.get("/:id", getHistory);

export default router;