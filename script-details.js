let URLAPI = "https://mindhub-xj03.onrender.com/api/amazing"
let events = []

async function getEvents(){ 
  try{
    const response = await fetch(URLAPI) 
    const data = await response.json()
    let  events = data.events

        const queryString = location.search 
        console.log(queryString)
        const params = new URLSearchParams(queryString)
        const id = params.get("id")
        console.log(id);
        const eventoParaMostrarDetails = events.find(evento => events._id == id)
        const htmlDetails = document.querySelector("#cards-details")
        console.log(events);
        htmlDetails.innerHTML =  
        `
        <div class="card mb-3 container-cards" style="max-width: 1300px; height: 400px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${events[id-1].image}" class="img-fluid rounded-start img-details" alt="${events[id-1].name}">
          </div>
          <div class="col-md-8">
            <div class="card-body card-align">
              <h4 class="card-title" style="font-size: 60px">${events[id-1].name}</h5>
              <p class="card-details" style="font-size: 30px">${events[id-1].description}</p>
              <p class="card-details" style="font-size: 30px;">Ubicated in the ${events[id-1].place}</p>
              <div class="cards-flex">
              <p class="card-text" style="font-size: 30px; margin-right: 100px;">Price: $${events[id-1].price}</p>
              <p class="card-text" style="font-size: 30px; margin-left: 100px;">Capacity: ${events[id-1].capacity}</p>
            </div>
          </div>
        </div>
      </div>
        `

  }
  catch(error) {
    console.log(error)
  }
}

getEvents()

