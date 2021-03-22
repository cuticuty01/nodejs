import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";


//Thêm sản phẩm
export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm sản phẩm không thành công"
      })
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: "Bạn cần nhập đầy đủ thông tin"
      })
    }

    let product = new Product(fields);
    //1kb = 1000
    //1mb = 100000
    if (files.photo) {
      if (files.photo.size > 100000) {
        res.status(400).json({
          error: "Bạn nên upload ảnh dưới 1mb"
        })
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.ContentType = files.photo.path;
    }
    product.save((err, data) => {
      if (err) {
        res.status(400).json({
          error: "Không thêm được sản phẩm"
        })
      }
      res.json(data);
    })
  })
}

// export const create = (req, res) => {
//   const product = new Product(req.body);
//   product.save((err, data) => {
//     if (err) {
//       res.status(400).json({
//         error: "Add product failed",
//       });
//     } else {
//       res.json(data);
//     }
//   });
// };

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

