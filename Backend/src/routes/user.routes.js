import { Router } from "express";
import { deleteUser, getAllUsers, getBooks, getUser, updateInfoUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers)
router.get("/:id", getUser);
router.patch("/update/:id", updateInfoUser);
router.delete("/delete/:id", deleteUser);
router.get("/books/:id", getBooks);

export default router;