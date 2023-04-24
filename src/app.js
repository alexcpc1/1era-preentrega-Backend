import { Express } from "express";
import { productRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080;
app.listen(port,()=> console.log(`Server listening on port ${port}`));

app.use(express.urlencoded({ extended: true }));

//midlewares
app.use(express.json());

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const productManager = new ProductManager("./src/file/products.json");
// console.log(productManager);

// app.get("/products", async (req,res) => {
//     try{
//         let limit = parseInt (req.query.limit);
//         if(!limit) 
//             return  res.send(await productManager.getProducts())
//         const allProducts = await productManager.getProducts();
//         let productLimitet = allProducts.slice(0, limit)  
//         res.send(productLimitet);
//     } catch(error){
//         throw new error(error.mesage);
//     }
// });
// app.get("/products/:id", async (req,res) => {
//     try{
//         let id = parseInt (req.params.id);
//         const allProducts = await productManager.getProducts();
//         const productById = allProducts.find(product=>product.id===id);
//         res.send(productById);
//     } catch(error){
//         throw new error(error.mesage);
//     }
// });

// app.on("error", (error) => console.log(`Error del servidor ${error}`))
