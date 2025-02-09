import { Router } from "express";

import fs from "node:fs"

const router = Router()

const rutaProcutos = "./src/data/productos.json"

router.get("/home",(req,res)=>{

    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    res.render('home',{data})

})

router.get('/realtimeproducts',(req,res)=>{

    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    res.render('realTimeProducts',{data})

})

export default router 