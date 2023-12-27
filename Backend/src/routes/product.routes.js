import { Router } from "express";
import { createProduct, getProduct, getProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.post("/create", createProduct);
router.get("/products", getProducts);
router.patch("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getProduct);

export default router;