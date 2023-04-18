import express from "express";
import { ProductManager } from "./ProductManager"; 

const app = express()

const port = 8080;

const manager = new ProductManager();

app.get("../products", async (req,res) => {
    const price = await manager.getProducts();
    resizeBy.send(price)
})
console.log(await price);

app.listen(port,()=>console.log(`Server listening on port ${port}`));
