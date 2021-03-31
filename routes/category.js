import express from "express";
const router = express.Router();
import { create, categoryById, lists, read, update, remove } from "../controllers/category";

// list danh mục
router.get("/categories", lists);

// Thêm danh mục
router.post("/category", create);

router.get("/category/:categoryId", read);

router.delete("/category/:categoryId", remove);

router.put("/category/:categoryId", update);

router.param("categoryId", categoryById);


module.exports = router;
