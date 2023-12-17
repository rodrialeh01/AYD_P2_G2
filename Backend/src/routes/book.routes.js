import { Router } from "express";

import {createBook,getBooks,getBookById,updateBookByID,deleteBook,buyBook,rentBook,returnBook,getAllBooks} from "../controllers/book.controller.js";

const router = Router();

router.get("/getBooks", getBooks);
router.get("/getAllBooks", getAllBooks);
router.post("/buyBook", buyBook);
router.post("/rentBook", rentBook);
router.post("/returnBook", returnBook);
router.post("/create", createBook);
router.patch("/update/:id", updateBookByID);
router.delete("/delete/:id", deleteBook);
router.get("/:id", getBookById);

export default router;