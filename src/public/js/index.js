const urlParams = new URLSearchParams(window.location.search);

let limit = urlParams.get('limit');
let page = urlParams.get('page');
let sort = urlParams.get('sort');
let query = urlParams.get('query');




let apiUrl = `http://localhost:8080/api/productos?limit=${limit}&page=${page}&sort=${sort}`;
if (query) {
    apiUrl += `&query=${query}`;
}


function cargarProductos(apiUrl) {

    
    
        fetch(apiUrl)
        .then((res) => {
            return res.json();
        })
        .then((info) => {
    
            console.log(info.data)

            const contenedorCards = document.querySelector("#contenedor-cards")
            contenedorCards.innerHTML=``
       
    
            info.data.payload.forEach((element) => {

    
                const col = document.createElement("div")
                col.classList.add("col","mb-5")
    
                const card = document.createElement("div")
                card.classList.add("card","h-100",)
    
                card.innerHTML=`
                
                    <img src="${element.thumbnails[0]}" class="card-img-top" alt="${element.title}">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <h5 class="card-title fw-bold">$${element.price}</h5>
                    </div>
                    <button class="boton-comprar" id=${element._id} >COMPRAR</button
                
                `
                
                col.appendChild(card)
    
                contenedorCards.appendChild(col)
             
    
            });
    
            
            const botonesComprar = document.querySelectorAll(".boton-comprar")
    
            botonesComprar.forEach((element)=>{
                element.addEventListener("click",()=>{
                    alert("Comprando elemento ID: "+element.id)
                })
    
            })

            actualizarBotonesPaginacion(info.data.prevLink, info.data.nextLink)
    
            
        })
        .catch((error)=>{
            console.log(error)
        })

}


function actualizarBotonesPaginacion(prevPage,nextPage){


    const contenedorBody = document.querySelector("#contenedor-botones")
    contenedorBody.innerHTML = ``

    if(prevPage){

        const button = document.createElement("button")
        button.id = "prevButton"
        button.innerText = "PREV"
        contenedorBody.appendChild(button)

        const botonPrEV = document.querySelector("#prevButton")

        botonPrEV.addEventListener("click",()=>{

        cargarProductos(prevPage)

        console.log("APRETE EL PREV")

    })

    }

    if(nextPage){

        const button = document.createElement("button")
        button.id = "nextButton"
        button.innerText = "NEXT"
        contenedorBody.appendChild(button)

        const botonNext = document.querySelector("#nextButton")

        botonNext.addEventListener("click",()=>{

            cargarProductos(nextPage)

        })

    }

    

    

}


cargarProductos(apiUrl)