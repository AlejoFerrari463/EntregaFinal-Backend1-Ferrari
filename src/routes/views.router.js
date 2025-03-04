import { Router } from "express";



const router = Router()


router.get("/products",async(req,res)=>{


    // res.json({status: "Get de productos",payload: result.docs, totalPages: result.totalPages, prevPage: result.prevPage, nextPage: result.nextPage, page: result.page, hasPrevPage: result.hasPrevPage, hasNextPage: result.hasNextPage, prevLink, nextLink})

    res.render("index",{})

})



export default router 