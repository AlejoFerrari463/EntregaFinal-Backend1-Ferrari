import { Router } from "express";

const router = Router()

import cartsModel from "../models/carts.model.js";


router.get("/products", async (req,res)=>{


    // res.json({status: "Get de productos",payload: result.docs, totalPages: result.totalPages, prevPage: result.prevPage, nextPage: result.nextPage, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevLink, nextLink})

    res.render("index",{})

})


router.get("/carts/:cid",async(req,res)=>{

    const idCarro = req.params.cid

    try {
        const result = await cartsModel.findById(idCarro).populate("products.idProduct").lean()
        console.log(result)
        return res.render("carts",{cart: result})
    } catch (error) {
        return res.json({mensaje: "No existe ese id de carrito", errorFue: error})
    }


})



export default router 