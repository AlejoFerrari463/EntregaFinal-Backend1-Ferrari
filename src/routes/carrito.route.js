import { Router } from "express";

const routeCarrito = Router()

import cartsModel from "../models/carts.model.js";


routeCarrito.get("/:cid",async(req,res)=>{

    const idCarro = req.params.cid

    try {
        const result = await cartsModel.findById(idCarro).populate("products.idProduct")
        return res.json({mensaje: "Get de carrito",cart: result})
    } catch (error) {
        return res.json({mensaje: "No existe ese id de carrito", errorFue: error})
    }

})


routeCarrito.put("/:cid",async(req,res)=>{

    const nuevoCarro = req.body
    const idCarro = req.params.cid

    try {
        const result = await cartsModel.findByIdAndUpdate(idCarro,{products: nuevoCarro},{new: true})
        return res.json({mensaje: "Actualizar de 0 carrito", cart: result})
    } catch (error) {
        return res.json({errorFue: error})
    }



})

routeCarrito.put("/:cid/products/:pid",async(req,res)=>{

    const {cid,pid} = req.params

    const cantidad = req.body.cantidad

    if(cantidad){

        let carrito;

        try {
            carrito = await cartsModel.findById(cid)
        } catch (error) {
            return res.json({mensaje: "No existe ese id de carrito", errorFue: error})
        }

        const existeProducto = carrito.products.find((item)=>{
            return pid == item.idProduct
        })

        if(existeProducto){


            try {

                carrito.products.forEach((item)=>{
                    if (item.idProduct == pid){
                        item.quantity = cantidad
                    }
                })
        
                const nuevoArrayProds = carrito.products
                const result = await cartsModel.findByIdAndUpdate(cid,{products: nuevoArrayProds},{new: true})
        
                return res.json({mensaje: "Put de producto en carrito ya existente", cart: result})
                
            } catch (error) {
                return res.json({error})
            }

        }
        else {
            return res.json({mensaje: "No existe ese id de producto en el carrito"})
        }

    }
    else {
        return res.json({mensaje: "No se paso una cantidad a actualizar"})
    }

    

})

routeCarrito.post("/",async (req,res)=>{

    const { products } = req.body;

    if(products){

        try {
            const result = await cartsModel.insertOne({products: products})
            return res.json({mensaje: "Post de carritos",cart: result})
        } catch (error) {
            return res.json({error})
        }
       
    }
    else {
        try {

            const result = await cartsModel.insertOne({products: []})
            return res.json({mensaje: "Post de carritos",cart: result})
            
        } catch (error) {
            return res.json({error})
        }  
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


        try {

            carrito.products.push({idProduct: pid, quantity: 1})
            const nuevoArrayProds = carrito.products
            const result = await cartsModel.findByIdAndUpdate(cid,{products: nuevoArrayProds},{new: true})
            return res.json({mensaje: "Post de producto en carrito sin existir", cart: result})
            
        } catch (error) {
            return res.json({mensaje: "qqq",error})
        }

       
    }
    else {

        try {

            carrito.products.forEach((item)=>{
                if (item.idProduct == pid){
                    item.quantity++
                }
            })
    
            const nuevoArrayProds = carrito.products
            const result = await cartsModel.findByIdAndUpdate(cid,{products: nuevoArrayProds},{new: true})
    
            return res.json({mensaje: "Post de producto en carrito ya existente", cart: result})
            
        } catch (error) {
            return res.json({error})
        }

    }
   
})


routeCarrito.delete("/:cid/products/:pid",async (req,res)=>{

    const {cid,pid} = req.params

    let carrito;

    try {
        carrito = await cartsModel.findById(cid)
    } catch (error) {
        return res.json({errorFue: error})
    }

    const filtrarArrayProductos = carrito.products.filter((item)=>{
        return item.idProduct != pid
    })

    try {
        const result = await cartsModel.findByIdAndUpdate(cid,{products: filtrarArrayProductos},{new: true})
        return res.json({mensaje: "Eliminar producto de carrito", cart: result})
    } catch (error) {
        return res.json({mensaje: "No existe ese id de carrito"})
    }


})

routeCarrito.delete("/:cid",async (req,res)=>{

    const {cid} = req.params

    try {

        const result = await cartsModel.findByIdAndUpdate(cid,{products: []},{new: true})
        return res.json({mensaje: "Eliminar todos los productos de un carrito", cart: result})

    } catch (error) {
        return res.json({mensaje: "No se encontro un carrito con ese id", errorFue: error})
    }




})


export default routeCarrito