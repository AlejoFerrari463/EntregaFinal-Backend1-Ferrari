import { Router } from "express";

import fs from "node:fs"

const rutaCarritos = "./src/data/carrito.json"
const rutaProcutos = "./src/data/productos.json"

const routeCarrito = Router()


routeCarrito.get("/:cid",(req,res)=>{

    const idCarro = req.params.cid

    const misCarritos = fs.readFileSync(rutaCarritos,'utf-8')
    const data = JSON.parse(misCarritos)

    const proximoId = data.length > 0 ? Math.max(...data.map((item)=>{return item.id})) + 1: 1 
    console.log("PROXIMO ID: "+proximoId)
    if(idCarro){

        const obtenerCarro = data.find((item)=>{
            return item.id == idCarro
        })

        if(obtenerCarro){
            return res.send(obtenerCarro.products)
        }
        else {
            return res.send("NO EXISTE ESE ID DE CARRITO")
        }

    }

    res.send(obtenerCarro.products)

})

routeCarrito.post("/",(req,res)=>{

    const misCarritos = fs.readFileSync(rutaCarritos,'utf-8')
    const data = JSON.parse(misCarritos)

    const proximoId = data.length > 0 ? Math.max(...data.map((item)=>{return item.id})) + 1: 1 
    data.push({id: proximoId,products: []})

    fs.writeFileSync(rutaCarritos,JSON.stringify(data,null,4))

    res.send(data)

})

routeCarrito.post("/:cid/product/:pid",(req,res)=>{

    const {cid,pid} = req.params

    const misCarritos = fs.readFileSync(rutaCarritos,'utf-8')
    const dataCarrito = JSON.parse(misCarritos)


    const misProductos = fs.readFileSync(rutaProcutos,'utf-8')
    const dataProductos= JSON.parse(misProductos)

    if(cid){

        const buscarCarrito = dataCarrito.find((item)=>{
            return item.id == cid
        })
        // SI EXISTE ESE ID CARRITO
        if(buscarCarrito){

            const buscarProducto = dataProductos.find((item)=>{
                return item.id == pid
            })
            // SI EXISTE ESE ID PRODUCTO
            if(buscarProducto){

                const existeYaProdEnCarro = buscarCarrito.products.find((item)=>{
                    return item.idProduct == pid
                })

                // SI YA EXISTE EN EL CARRITO
                if(existeYaProdEnCarro){

                    // BUSCO EL INDICE DEL PRODUCTO YA EN PRODUCTS
                    const indiceDeProductoEnCarrito = buscarCarrito.products.findIndex((item)=>{
                        return item.idProduct == pid
                    })

                    // PRODUCTS EN CARRITO YA ACTUALIZADO
                    existeYaProdEnCarro.quantity+=1  
                    buscarCarrito.products[indiceDeProductoEnCarrito] = existeYaProdEnCarro
                    //console.log(buscarCarrito)

                    const encontrarIndiceCarrito = dataCarrito.findIndex((item)=>{
                        return item.id == cid
                    })
                    dataCarrito[encontrarIndiceCarrito] = buscarCarrito
                    fs.writeFileSync(rutaCarritos,JSON.stringify(dataCarrito,null,4))
                    return res.send("CANTIDAD DEL PRODUCTO ACTUALIZADA")
                }

                // SI NO EXISTE EN EL CARRITO
                else {

                    buscarCarrito.products.push({idProduct: parseInt(pid),quantity: 1})
                    const encontrarIndiceCarrito = dataCarrito.findIndex((item)=>{
                        return item.id == cid
                    })

                    dataCarrito[encontrarIndiceCarrito] = buscarCarrito
                    fs.writeFileSync(rutaCarritos,JSON.stringify(dataCarrito,null,4))
                    return res.send("NUEVO PRODUCTO AGREGADO")
                }

                

                return res.send(buscarCarrito)

            }
             // SI NO EXISTE ESE ID PRODUCTO
            else {
                return res.send("NO EXISTE ESE ID DE PRODUCTO")
            }

        }
        // SI NO EXISTE ESE ID CARRITO
        else {
            return res.send("NO EXISTE ESE ID DE CARRITO")
        }

    }

    res.send(dataCarrito)

})


export default routeCarrito