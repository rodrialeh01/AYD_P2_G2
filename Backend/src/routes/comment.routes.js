import { Router } from "express";

import {createComment, getCommentsByBookId, deleteComment} from "../controllers/comment.controller.js";

const router = Router();

router.post("/create", createComment);
router.delete("/delete/:id", deleteComment);
router.get("/:id", getCommentsByBookId);

export default router;