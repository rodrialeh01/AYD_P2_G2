import { Router } from "express";
import { createPet, getPet, getPetsByClient, getPets, updatePet, getPetsByCuidador, hospedarPet, atenderPet, changeStatePet } from "../controllers/pet.controller.js";

const router = Router();

router.post("/create", createPet);
router.get("/pets", getPets);
router.patch("/update/:id", updatePet);
router.get("/client/:id", getPetsByClient);
router.get("/keeper/:id", getPetsByCuidador);
router.post("/hospedar", hospedarPet);
router.post("/atender", atenderPet);
router.post("/estado", changeStatePet);
router.get("/:id", getPet);


export default router;