import Product from "../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from 'lodash';


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

export const read = (req, res) => {
  return res.json(req.product);
}


// List sản phẩm
export const lists = async (req, res) => {
  const list = await Product.find({});
  res.json(list);
};


// Xóa sản phẩm
export const remove = (req, res) => {
  let product = req.product; //Lấy thông tin của sản phẩm;
  product.remove((err, deleteProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được sản phẩm"
      })
    } else {
      res.json({
        deleteProduct,
        message: "Sản phẩm đã xóa thành công"
      })
    }
  })
}

// Sửa sản phẩm
export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Sửa sản phẩm không thành công",
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: "Bạn cần nhập đầy đủ thông tin",
      });
    }

    //  let product = new Product(fields);
    let product = req.product;
    product = _.assignIn(product, fields);
    //1kb = 1000
    //1mb = 100000
    if (files.photo) {
      if (files.photo.size > 100000) {
        res.status(400).json({
          error: "Bạn nên upload ảnh dưới 1mb",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.ContentType = files.photo.path;
    }
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Không sửa được sản phẩm",
        })
      }
      res.json(data);
    })
  })
};
export const findById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.json({ message: 'error' })
    }
    req.product = product;
    next();
  });
}



