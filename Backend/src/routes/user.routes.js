import { Router } from "express";
import { deleteUser, getAllUsers, getPets, getUser, updateInfoUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers)
router.get("/:id", getUser);
router.patch("/update/:id", updateInfoUser);
router.delete("/delete/:id", deleteUser);
router.get("/pets/:id", getPets);

export default router;