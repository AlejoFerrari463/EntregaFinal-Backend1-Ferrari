import { Router } from "express";

import fs from "node:fs"


const rutaProcutos = "./src/data/productos.json"


const routeProductos = Router();

import productsModel from "../models/products.model.js";

routeProductos.get("/", async (req,res)=>{

    const result = await productsModel.find()


     let {limit,page,query,sort} = req.query

     if(!limit){
        limit = 10
     }

     if(!page){
        page = 1
     }
     if(!sort){
        sort = {}
     }
     if(!query){
        query = {}
     }


    res.json({mensaje: "Get de productos",payload: result,prueba: {limit, page,sort,query}})

})

routeProductos.get("/:pid",async(req,res)=>{

  
    const {pid} = req.params

    try {
        const result = await productsModel.findById(pid)
        return res.json({mensaje: "Post de productos",payload: result})
    } catch (error) {
        return res.json({errorFue: error})
    }

  
    
})


routeProductos.post("/", async (req,res)=>{


    const body = req.body

    try {
        const result = await productsModel.insertOne(body)
        return res.json({mensaje: "Post de productos",payload: result})
    } catch (error) {
        return res.json({errorFue: error})
    }


})


routeProductos.put("/:pid",async (req,res)=>{


    const idBuscar = req.params.pid 
    const nuevoProd = req.body

    try {
        const result = await productsModel.findByIdAndUpdate(idBuscar,nuevoProd,{new: true})
        return res.json({mensaje: "Put de productos",payload: result})
    } catch (error) {
        return res.json({errorFue: error})
    }
   



})



routeProductos.delete("/:pid",async(req,res)=>{


    const {pid} = req.params

    try {
        const result = await productsModel.findByIdAndDelete(pid)
        return res.json({mensaje: "Delete de productos",payload: result})
    } catch (error) {
        return res.json({errorFue: error})
    }
   

    
})


export default routeProductos