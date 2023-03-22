let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";
let events = [];
let pastEvents = [];
let futureEvents = [];



async function getEvents() {
    try {
        let response = await fetch(urlAPI);
        let dataAPI = await response.json();

        events = dataAPI.events
        fecha = dataAPI.currentDate
        
        // Ya tengo disponible el array para hacer las operaciones iniciales
        console.log(events);
        console.log(fecha)

        filtrarArrayPasado(events)
        filtrarArrayFuturo(events)
        getBigger(pastEvents)
        getSmaller(pastEvents)
        biggerCapacity(events)
        loadStats1()
        categNoRepetidasPasado(events);
        categNoRepetidasFuturo(futureEvents)
        loadStats2();
        loadStats3();

    } catch (error) {
        console.log(error.message);
        }
}

getEvents();

function filtrarArrayPasado(array){
    for(let i = 0; i < array.length; i++){
        if(array[i].date < fecha){
            pastEvents.push(array[i])
        }
    }   
}

function filtrarArrayFuturo(array){
    for(let i = 0; i < array.length; i++){
        if(array[i].date > fecha){
            futureEvents.push(array[i])
        }
    }   
}

function getBigger(array){
    return array.reduce((acc, val) => {
        if (((val.assistance *100)/val.capacity) > ((acc.assistance *100)/acc.capacity)){
            return val
        } else {
            return acc
        }
    })
}

function getSmaller(array){
    return array.reduce((acc, val) => {
        if (((val.assistance *100)/val.capacity) < ((acc.assistance *100)/acc.capacity)){
            return val
        } else {
            return acc
        }
    })
}

function biggerCapacity(array){
    return array.reduce((acc, val) => {
        if(val.capacity > acc.capacity){
            return val
        } else {
            return acc
        }
    })
}

function loadStats1(){
    let container = document.querySelector(".stats");
    let tableBodyHTML = "";
    let bigger = getBigger(pastEvents)
    let smaller = getSmaller(pastEvents)
    let bigCap = biggerCapacity(events)
    tableBodyHTML += `
    <tr>
    <td>${bigger.name}</td>
    <td>${smaller.name}</td>
    <td>${bigCap.name}</td>
    </tr>
    `
    container.innerHTML = tableBodyHTML
}

function eventsByCategory(categorys, events){
    return events.filter(event => event.category.includes(categorys))
}

function categNoRepetidasPasado(events) {
    let categorias = [] 
        events.forEach(each => {
        if ( ! categorias.includes(each.category) ) {
            categorias.push(each.category)
        }
    })
    return categorias
}

function categNoRepetidasFuturo(futureEvents) {
    let categorias = [] 
        futureEvents.forEach(each => {
        if ( ! categorias.includes(each.category) ) {
            categorias.push(each.category)
        }
    })
    return categorias
}

function percentagePast(array){

}


 function sumAttendance(array) {
     let sum = 0
     for (let percentage of array) {
         sum += percentage
     }
     return (sum / array.length).toFixed(2)
 }


function loadStats2(){
    let container = document.querySelector(".stats2");
    let tableBodyHTML = "";
    let categorias = categNoRepetidasFuturo(futureEvents);

    categorias.forEach(elemento => {
        let qty = []
        let revenues = 0
        futureEvents.forEach(element => {
            if(element.category == elemento){
                revenues += (element.price * element.estimate)
            }
            return revenues
        })


        let percentage = 0
        futureEvents.forEach(element => {
            if(element.category == elemento){
                qty++
                percentage += ((element.estimate * 100) / element.capacity)
            }
        })

        percentage = (percentage / qty).toFixed(2)

        tableBodyHTML += `
        <tr>
        <td>${elemento}</td>
        <td>${revenues}</td>
        <td>${percentage}%</td>
        </tr>
        `
    });

    container.innerHTML = tableBodyHTML
}

function loadStats3(){
    let container = document.querySelector(".stats3");
    let tableBodyHTML = "";
    let categorias = categNoRepetidasPasado(events);

    categorias.forEach(elemento => {
        let revenues = 0
        pastEvents.forEach(element => {
            if(element.category == elemento){
                revenues += (element.price * element.assistance)
            }
            return revenues
        })
        let qty = 0
        let percentage = 0
        pastEvents.forEach(element => {
            if(element.category == elemento){
                qty++
                percentage += ((element.assistance * 100) / element.capacity)
            }
        })

        percentage = (percentage/qty).toFixed(2)

        tableBodyHTML += `
        <tr>
        <td>${elemento}</td>
        <td>${revenues}</td>
        <td>${percentage}%</td>
        </tr>
        `
    });

    container.innerHTML = tableBodyHTML
}
