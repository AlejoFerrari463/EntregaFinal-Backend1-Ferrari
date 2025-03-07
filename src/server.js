
import routeProductos from "./routes/productos.route.js";
import routeCarrito from "./routes/carrito.route.js";
import routeViews from "./routes/views.router.js"
import express from "express"
import path from 'path'

import handlebars from "express-handlebars"

import { mongoConnection } from "./connections/mongo.js";

const app = express();


app.engine('handlebars',handlebars.engine())
app.set('views',path.join(process.cwd(), "src", "views")) // _dirname + "/views"
app.set('view engine','handlebars')

app.use(express.static(path.join(process.cwd(), "src", "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos",routeProductos)
app.use("/api/carts",routeCarrito)
app.use("/",routeViews)

mongoConnection()

app.listen(8080, ( ) => {
    console.log("SERVER ON")
})
