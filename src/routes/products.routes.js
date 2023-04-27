import {Router} from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager = new ProductManager("products.json");
console.log(productManager);

const router = Router();

router.get("/", async(req,res)=>{
    try {
        const products = await productManager.getProducts();
        res.json({status:"success", data:products});
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
});

// http:localhost:8080/api/products?limit=
router.get("/api/products?limit",async(req,res)=>{
    try{
        let limit = parseInt (req.query.limit);
        if(!limit) 
            return  res.send(await productManager.getProducts())
        const allProducts = await productManager.getProducts();
        let productLimitet = allProducts.slice(0, limit)  
        res.send(productLimitet);
    } catch(error){
        res.status(400).json({status:"error", message:error.message});
    }
});

// http:localhost:8080/api/products/id=3
router.get("/api/products/:id",async(req,res)=>{
    try{
        let id = parseInt (req.params.pid);
        const allProducts = await productManager.getProducts();
        const productById = allProducts.find(product=>product.id===id);
        res.send(productById);
    } catch(error){
        res.status(400).json({status:"error", message:error.message});
    }
});

// para agregar el producto
router.post("/",async(req,res)=>{
    try {
        const {title, description, code, price, status, stock, category} = req.body;
        if(!title || !description || !code || !price || !status || !stock || !category){
        return res.status(400).json({status:"error", message:"Los campos no son validos"})
        }
        const newProduct = req.body;
        const productSaved = await productManager.addProduct(newProduct);
        res.json({status:"success", data:productSaved});
    } catch (error) {
        res.status(400).json({status:"error", message:error.message});
    }
});

router.put("/api/products/:id", async(req,res)=>{
    try {
        const id = req.params.id;
        const updateProduct = req.body;
        const productIndex = await product.updateProduct(id, updateProduct);
            return (productIndex);
    } catch(error){
        res.status(400).json({status:"error", message:error.message});
    }
});

router.delete("/api/products/:id",async(req,res)=>{
    try {
        const id = req.params.id;
        const productId = await productManager.deleteProduct(id);
            return (productId);
    } catch(error){
        res.status(400).json({status:"error", message:error.message});
    }
});

export {router as productRouter};