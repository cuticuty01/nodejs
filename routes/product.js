import express from "express";
import { create, detailProduct, lists, update, remove } from "../controllers/product";

const router = express.Router();



// List sản phẩm
router.get("/product", lists);

// Chi tiết sp
router.get("/product/:id", detailProduct);

// Thêm sản phẩm
router.post("/product", create);

// Sửa sản phẩm
router.patch("/product:id", update);

// Xóa sản phẩm
router.delete("/product:id", remove);


module.exports = router;
