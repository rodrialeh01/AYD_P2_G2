import { Router } from "express";
import { atenderPet, changeStatePet, createPet, devolverPet, getPet, getPets, getPetsByClient, getPetsByCuidador, hospedarPet, recogerPet, updatePet } from "../controllers/pet.controller.js";

const router = Router();

router.post("/create", createPet);
router.post("/devolver/:id_pet", devolverPet);
router.post("/recoger/:id_pet", recogerPet);
router.get("/pets", getPets);
router.patch("/update/:id", updatePet);
router.get("/client/:id", getPetsByClient);
router.get("/keeper/:id", getPetsByCuidador);
router.post("/hospedar", hospedarPet);
router.post("/atender", atenderPet);
router.post("/estado", changeStatePet);
router.get("/:id", getPet);


export default router;