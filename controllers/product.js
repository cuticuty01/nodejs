import Product from "../models/product";

export const create = (req, res) => {
  const product = new Product(req.body);
  product.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Add product failed",
      });
    } else {
      res.json(data);
    }
  });
};

// Thiếu async await
export const lists = async (req, res) => {
  const list = await Product.find({});
  res.json(list);
};

export const detailProduct = async (req, res) => {
  const product = await Product.find({ _id: req.params.id });
  res.json(product);
};

export const remove = (req, res) => {
  const product = new Product(req.body);
  product.remove((err, deleteProduct) => {
    if (err) {
      res.status(400).json({
        error: "Không xóa được sản phẩm",
      });
    } else {
      res.json({
        deleteProduct,
        message: "Sản phẩm đã được xóa thành công"
      })
    }
  });
};

export const update = (req, res) => {
  const product = new Product(req.body);
  product.findOne((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Edit product failed",
      });
    } else {
      res.json(data);
    }
  });
};
