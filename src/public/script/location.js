import {getBookLocationsFromDb, getBooksByLocation} from './db.js';
import displayMenuItems from './app.js'

let form = document.querySelector(".modal-form");
let options = form.querySelectorAll("option");
let locations = await getBookLocationsFromDb().then(res => res.json()).then(data =>{
    return data
})

let booksByLocation = await getBooksByLocation().then(res => res.json()).then(data => {
    return data.data[0]
})

displayMenuItems(booksByLocation)

options.forEach( (option) =>{
    locations.data.forEach(location =>{
        if(location.location_name === capitalizeFirstLetter(option.value)){
            option.setAttribute("data-location_id",location.location_id)
            let book_location_id = location.location_id
            window.localStorage.setItem("user_location_id",book_location_id)
            console.warn(book_location_id)
        }
    });
    
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
