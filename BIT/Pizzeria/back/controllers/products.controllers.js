import { productModel } from "../models/products.js"

export const createProducts = async (request, response) => {
    try{
        let body = request.body

        let newProducts = await productModel.create(body)

        response.json(newProducts)
    }catch(e){
        console.log(e)
        response.json(e)
    }
}
export const getProducts = async (request, response) => {
    try{
        let products = await productModel.find()

        const data = {
            products
        }
        response.json(data)
    }catch(e){
        console.log(e)
        response.json(e)
    }
}
export const getProductsByCategory = async (request, response) => {
    try{
        let categoryFilter = request.params.category

        let products = await productModel.find({category: categoryFilter})
        response.json(products)
    }catch(e){
        console.log(e)
        response.json(e)
    }
}
export const deleteProducts = async (request, response) => {
    try{
        let idForDelete = request.params.id
        let products = await productModel.findByIdAndDelete(idForDelete)
        response.json(products)
    }catch(e){
        console.log(e)
        response.json(e)
    }
}
