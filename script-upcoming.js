let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
let eventos = [];
const input = document.querySelector("input")
const contenedorChecks = document.getElementById("checkboxes")


async function getEvents() {
    try {
        let response = await fetch(urlAPI);
        let dataAPI = await response.json();
        
        
        input.addEventListener("input", filtroDoble)
        contenedorChecks.addEventListener("change", filtroDoble)

        console.log(dataAPI);

        
         events = dataAPI.events
         for (const event of dataAPI.events) {
           if(event.date > dataAPI.currentDate ){
            eventos.push(event);
        }
         }

        // Ya tengo disponible el array para hacer las operaciones iniciales
        
        renderCards(eventos);
        crearCheckboxes(eventos);
        

    } catch (error) {
        console.log(error.message);
        }
}

console.log(eventos);

getEvents();

function renderCards(events){
    let container = document.querySelector(".contenedor");
    if(events.length == 0){
        container.innerHTML = "<h3 class=`display-1`>No hay coincidencias.</h3>"
        return 
      }
    let htmlCards = "";
    events.forEach(events => htmlCards += createCards(events));
    container.innerHTML = htmlCards;
}

function createCards(events){
    return `
    <div class="card" style="width: 18rem;">
    <img src="${events.image}" class="card-img-top" alt="${events.name}">
    <div class="card-body">
    <h4 class="card-text">${events.name}</h1>
      <p class="card-text">${events.description}</p>
      <p class="card-details" style="margin-top: 10px;">Date: ${events.date}</p>
      <div class="cards-flex">
      <p class="card-text">$${events.price}</p>
      <a class="more" href="./details.html?id=${events._id}">Ver más...</a>
    </div>
</div>
</div>
    `
}

function filtroDoble(){
    let arrayFiltrado = filtrarPorTexto(eventos, input.value)
    let arrayFiltrado2 = filtrarPorCategoria(arrayFiltrado)
    renderCards(arrayFiltrado2)
  }

function filtrarPorTexto(arrayDatos, texto){
    let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
  }

function crearCheckboxes(arrayDatos){
    let checks = ``
    let categoriasRepetidas = arrayDatos.map(elemento => elemento.category)
    let categorias = new Set(categoriasRepetidas.sort((a,b)=>{
      if(a>b){
        return 1
      }
      if(a<b){
        return -1
      }
      return 0
    }))
    categorias.forEach(elemento =>{
      checks += `
      <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="${elemento}" value="${elemento}">
      <label class="form-check-label" for="${elemento}">${elemento}</label>
    </div>
      `
    })
    contenedorChecks.innerHTML = checks
  }

  function filtrarPorCategoria(arrayDatos){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let checksChecked = arrayChecks.filter(check => check.checked)
    if(checksChecked.length == 0){
      return arrayDatos
    }
    let checkValues = checksChecked.map(check => check.value)
    let arrayFiltrado = arrayDatos.filter(elemento => checkValues.includes(elemento.category))
    return arrayFiltrado
  }

