
import routeProductos from "./routes/productos.route.js";
import routeCarrito from "./routes/carrito.route.js";
import routeViews from "./routes/views.router.js"
import express from "express"
import path from 'path'

import handlebars from "express-handlebars"
import { Server } from "socket.io";

const app = express();

const serverHttp = app.listen(8080,()=>{
    console.log("PRE ENTREGA 2 ANDANDO")
})

const webSocketServer = new Server(serverHttp)

app.use((req,res,next)=>{

    req.ioServ = webSocketServer;
    next()

})


app.engine('handlebars',handlebars.engine())
app.set('views',path.join(process.cwd(), "src", "views")) // _dirname + "/views"
app.set('view engine','handlebars')

app.use(express.static(path.join(process.cwd(), "src", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos",routeProductos)
app.use("/api/carts",routeCarrito)
app.use("/",routeViews)



webSocketServer.on('connection',(socket)=>{
    console.log("NUEVO DISPOSITIVO CONECTADO: ",socket.id)

    socket.on('eliminarProductoServidor',(data)=>{
        webSocketServer.emit('actualizarProductos',data)
    })

})
