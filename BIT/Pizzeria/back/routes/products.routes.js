import express from "express";
import { createProducts, getProducts, deleteProducts, getProductsByCategory } from "../controllers/products.controllers.js";
import { authVerification } from "../middlewares/authentication.js";
const router = express.Router()
//router con capacidad de usar get post y demás

router.post("/createProducts", authVerification, createProducts)
router.get("/getProducts",getProducts)
router.get("/getProductsCategory/:category", getProductsByCategory)
router.delete("/deleteProducts/:id", deleteProducts)


export default router