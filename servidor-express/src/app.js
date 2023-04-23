import express, { request } from "express";
import {ProductManager} from "./ProductManager.js";

const app = express()
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./src/products.json");
// console.log(productManager);

const port = 8080;

app.get("/products", async (req,res) => {
    try{
        let limit = parseInt (req.query.limit);
        if(!limit) 
            return  res.send(await productManager.getProducts())
        const allProducts = await productManager.getProducts();
        let productLimitet = allProducts.slice(0, limit)  
        res.send(productLimitet);
    } catch(error){
        throw new error(error.mesage);
    }
});
app.get("/products/:id", async (req,res) => {
    try{
        let id = parseInt (req.params.id);
        const allProducts = await productManager.getProducts();
        const productById = allProducts.find(product=>product.id===id);
        res.send(productById);
    } catch(error){
        throw new error(error.mesage);
    }
});

app.listen(port,()=>
    console.log(`Server listening on port ${port}`));

app.on("error", (error) => 
    console.log(`Error del servidor ${error}`))
