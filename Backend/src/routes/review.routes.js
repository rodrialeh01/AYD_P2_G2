import { Router } from "express";
import { createReview, deleteReview, getReviews } from "../controllers/review.controller.js";

const router = Router();

router.post("/create", createReview);
router.get("/reviews", getReviews);
router.delete("/delete/:id", deleteReview);


export default router;