import { Router } from "express";

import fs from "node:fs"


const rutaProcutos = "./src/data/productos.json"


const routeProductos = Router();

routeProductos.get("/",(req,res)=>{

    
    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    const query = req.query
    const limit = query.limit
    
    if(limit){

        const productosLimitados = data.slice(0,limit)
        return res.send(productosLimitados)

    }

    const nextId = data.length > 0 
    ? Math.max(...data.map(item => item.id)) + 1 
    : 1;

    console.log("PROXIMO ID: "+nextId)

    res.send(data)

})

routeProductos.get("/:pid",(req,res)=>{

    
    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    const {pid} = req.params

    if(pid){

        const filtrado = data.find((item)=>{
            return pid == item.id
        })

        if(filtrado){
            return res.send(filtrado)
        }
        else {
            return res.send("NO EXISTE UN PRODUCTO CON ESE ID")
        }

    }
    
    res.send(data)

})


routeProductos.post("/",(req,res)=>{

    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    const idNuevo = data.length > 0 
    ? Math.max(...data.map(item => item.id)) + 1 
    : 1;
    const prod = req.body
    prod.status = true

    if(!prod.title || !prod.description || !prod.code || !prod.price || !prod.stock || !prod.category){
        return res.send("FALTAN CAMPOS A COMPLETAR")
    }

    const nuevoProducto = {id: idNuevo,...prod}

    data.push(nuevoProducto)

    
    fs.writeFileSync(rutaProcutos,JSON.stringify(data,null,4))

    req.ioServ.emit('agregarProducto',data)

    res.send(data)

})


routeProductos.put("/:pid",(req,res)=>{

    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    const idBuscar = req.params.pid 
    const nuevoProd = req.body

    if(idBuscar){

        const buscarProducto = data.find((item)=>{
            return item.id == idBuscar
        })

        if(!buscarProducto){
            return res.send("NO EXISTE ESE PRODUCTO A MODIFICAR")
        }
        else {

            if(nuevoProd.title){
                buscarProducto.title = nuevoProd.title
            }
            if(nuevoProd.description){
                buscarProducto.description = nuevoProd.description
            }
            if(nuevoProd.code){
                buscarProducto.code = nuevoProd.code
            }
            if(nuevoProd.price){
                buscarProducto.price = nuevoProd.price
            }
            if(nuevoProd.status){
                buscarProducto.status = nuevoProd.status
            }
            if(nuevoProd.stock){
                buscarProducto.stock = nuevoProd.stock
            }
            if(nuevoProd.category){
                buscarProducto.category = nuevoProd.category
            }
            if(nuevoProd.thumbnails){
                buscarProducto.thumbnails = nuevoProd.thumbnails
            }

            const buscarIndiceProductoModificado = data.findIndex((item)=>{
                return item.id == idBuscar
            })

            data[buscarIndiceProductoModificado] = buscarProducto

            fs.writeFileSync(rutaProcutos,JSON.stringify(data,null,4))
            return res.send("PRODUCTO MODIFICADO")
        }

    }
    else {
        return res.status(404);
    }

})



routeProductos.delete("/:pid",(req,res)=>{

    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const data = JSON.parse(misProductos)

    const {pid} = req.params

    if(pid){

        const productoEliminar = data.find((item)=>{
            return item.id == pid
        })
    
        if(productoEliminar){
    
            const filtradoEliminar = data.filter((item)=>{
                return item.id != pid
            })
    
            fs.writeFileSync(rutaProcutos,JSON.stringify(filtradoEliminar,null,4))
            
            req.ioServ.emit('eliminarProducto',filtradoEliminar)
            
            return res.send(`ID ${pid} ELIMINADO CON EXITO`)
        }
        else {
            return res.send("NO EXISTE ESE ID A ELIMINAR")
        }

    }

    else {
        return res.status(404);
    }

    
})


export default routeProductos