import express from "express";
import {
  create,
  lists,
  update,
  remove,
  findById,
  read
} from "../controllers/product";

const router = express.Router();



// List sản phẩm
router.get("/product", lists);

// Chi tiết sp
router.get("/product/:id", read);

// Thêm sản phẩm
router.post("/product", create);

// Sửa sản phẩm
router.put("/product/:id", update);

// Xóa sản phẩm
router.delete("/product/:id", remove);

router.param("id", findById);

module.exports = router;
