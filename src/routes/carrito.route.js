import { Router } from "express";


const routeCarrito = Router()

import cartsModel from "../models/carts.model.js";
import productsModel from "../models/products.model.js";


routeCarrito.get("/:cid",async(req,res)=>{

    const idCarro = req.params.cid

    try {
        const result = await cartsModel.findById(idCarro)
        return res.json({mensaje: "Get de carrito",payload: result})
    } catch (error) {
        return res.json({mensaje: "No existe ese id de carrito", errorFue: error})
    }

})

routeCarrito.post("/",async (req,res)=>{

    const { products } = req.body;

    if(products){
        const result = await cartsModel.insertOne({products: products})
        return res.json({mensaje: "Post de carritos",payload: result})
    }
    else {
        const result = await cartsModel.insertOne({products: []})
        return res.json({mensaje: "Post de carritos",payload: result})
    }

})

routeCarrito.post("/:cid/product/:pid",async (req,res)=>{

    const {cid,pid} = req.params

    let carrito;

    try {
        carrito = await cartsModel.findById(cid)
    } catch (error) {
        return res.json({mensaje: "No existe ese id de carrito", errorFue: error})
    }

    const existeProducto = carrito.products.find((item)=>{
        return pid == item.idProduct
    })

    if(!existeProducto){

        carrito.products.push({idProduct: pid,quantity: 1})

        const result = await cartsModel.findByIdAndUpdate(cid,carrito,{new: true})
        return res.json({mensaje: "Agregar producto a carrito", miCarro: result})

    }
    else {

        carrito.products[0].quantity += 1
        const result = await cartsModel.findByIdAndUpdate(cid,carrito,{new: true})
        return res.json({mensaje: "Agregar producto a carrito", miCarro: result})

    }

   
})


routeCarrito.delete("/:cid/product/:pid",async (req,res)=>{

    const {cid,pid} = req.params

    let carrito;

    try {
        carrito = await cartsModel.findById(cid)
    } catch (error) {
        return res.json({errorFue: error})
    }

    const filtrarCarro = carrito.products.filter((item)=>{
        return item.idProduct != pid
    })

    carrito.products = filtrarCarro

    try {
        const result = await cartsModel.findByIdAndUpdate(cid,carrito,{new: true})
        return res.json({mensaje: "Eliminar producto de carrito", miCarroActualizado: result})
    } catch (error) {
        return res.json({mensaje: "No existe ese id de carrito"})
    }


})


export default routeCarrito