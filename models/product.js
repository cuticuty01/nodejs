import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      strim: true,
      maxLeng: 32,
      require: true,
    },
    description: {
      type: String,
      require: true,
      maxLeng: 2000,
    },
    price: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      require: true,
      type: Boolean,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
