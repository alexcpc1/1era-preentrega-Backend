import express from "express";
import { productRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080;
app.listen(port,()=> console.log(`Server listening on port ${port}`));

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);