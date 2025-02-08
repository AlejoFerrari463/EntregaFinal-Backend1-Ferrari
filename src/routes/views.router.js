import { Router } from "express";

const router = Router()

router.get("/home",(req,res)=>{

    res.render('home',{data: true})

})

export default router 