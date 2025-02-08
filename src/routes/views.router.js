import { Router } from "express";

import fs from "node:fs"

const router = Router()

const rutaProcutos = "./src/data/productos.json"

router.get("/home",(req,res)=>{

    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    res.render('home',{data})

})

export default router 