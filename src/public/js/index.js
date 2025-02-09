
const ioCliente = io()

ioCliente.on('connect', () => {
    console.log("Cliente conectado al servidor WebSocket");
});

ioCliente.on('eliminarProducto',(data)=>{

    ioCliente.emit('eliminarProductoServidor',data)

})

ioCliente.on('actualizarProductos',(data)=>{

    const contenedorProds = document.querySelector("#contenedor-cards")
    contenedorProds.innerHTML = ``

    data.forEach(element => {
        
        const col = document.createElement("div")
        col.classList.add("col")

        const card = document.createElement("div")
        card.classList.add("card","h-100")

        const cardBody = document.createElement("div")
        cardBody.classList.add("card-body")

        const titulo = document.createElement("h5")
        titulo.classList.add("card-title")

        const precio = document.createElement("h5")
        precio.classList.add("card-title")

        const descripcion = document.createElement("p")
        descripcion.classList.add("card-text")


        titulo.innerText = `${element.title}`
        precio.innerText = `${element.price}`
        descripcion.innerText = `${element.description}`

        cardBody.appendChild(titulo)
        cardBody.appendChild(precio)
        cardBody.appendChild(descripcion)

        card.appendChild(cardBody)

        col.appendChild(card)


        contenedorProds.appendChild(col)

    });


})