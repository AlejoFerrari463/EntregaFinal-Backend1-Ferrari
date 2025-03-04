
const urlParams = new URLSearchParams(window.location.search);

let limit = urlParams.get('limit');
let page = urlParams.get('page');
let sort = urlParams.get('sort');
let query = urlParams.get('query');




let apiUrl = `http://localhost:8080/api/productos?limit=${limit}&page=${page}&sort=${sort}`;

if (query) {
    apiUrl += `&query=${query}`;
}

fetch(apiUrl)
    .then((res) => {
        return res.json();
    })
    .then((info) => {

        console.log(info.data.payload)

        const contenedorCards = document.querySelector("#contenedor-cards")

        info.data.payload.forEach((element) => {

            const col = document.createElement("div")
            col.classList.add("col","mb-5")

            const card = document.createElement("card")
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

        
    })
    .catch((error)=>{
        console.log(error)
    })
    
