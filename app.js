import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import ProductRoutes from "./routes/product";
import CategoryRoutes from "./routes/category";

//config

const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//collection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected`);
  });
mongoose.connection.on("Error", (err) => {
  console.log(`Data connect failed, ${err.message}`);
});

// router
app.use("/api", ProductRoutes);
app.use("/api", CategoryRoutes);

// app.use(morgan("dev"));
const port = process.env.PORT || 8000;
//creat serve
app.listen(port, () => {
  console.log(`Server is runing on port : http://localhost:${port}`);
});
