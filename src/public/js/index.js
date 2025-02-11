
const ioCliente = io()

ioCliente.on('connect', () => {
    console.log("Cliente conectado al servidor WebSocket");
});

ioCliente.on('eliminarProducto',(data)=>{

    ioCliente.emit('eliminarProductoServidor',data)

})

ioCliente.on('agregarProducto',(data)=>{

    ioCliente.emit('agregarProductoServidor',data)

})

ioCliente.on('actualizarProductos',(data)=>{

    Toastify({
        text: `Producto agregado/eliminado`,
        duration: 5000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

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
        precio.innerText = `$${element.price}`
        descripcion.innerText = `${element.description}`

        cardBody.appendChild(titulo)
        cardBody.appendChild(precio)
        cardBody.appendChild(descripcion)

        card.appendChild(cardBody)

        col.appendChild(card)


        contenedorProds.appendChild(col)


    });


})