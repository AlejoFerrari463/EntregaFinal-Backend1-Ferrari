import { Router } from "express";

const routeProductos = Router();

import productsModel from "../models/products.model.js";

routeProductos.get("/", async (req,res)=>{


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
    else {

        if(sort=="asc"){
            sort = {price: 1}
        }

        else {
            sort = {price: -1}
        }
    }

    if(!query){
        query = {}
    }
    else {
        query = {category: query}
    }

    const result = await productsModel.paginate(query,{limit, page, sort})

    let prevLink, nextLink;

    if(result.hasPrevPage){
        prevLink = `http://localhost:8080/api/productos?page=${result.prevPage}&limit=${limit}`
    }
    else {
        prevLink = null
    }

    if(result.hasNextPage){
        nextLink = `http://localhost:8080/api/productos?page=${result.nextPage}&limit=${limit}`

    }
    else {
        nextLink = null
    }


    res.json({status: "Get de productos",payload: result.docs, totalPages: result.totalPages, prevPage: result.prevPage, nextPage: result.nextPage, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevLink, nextLink})

})

routeProductos.get("/:pid",async(req,res)=>{

  
    const {pid} = req.params

    try {
        const result = await productsModel.findById(pid)
        return res.json({mensaje: "Get de producto especifico",payload: result})
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