import {getBookLocationsFromDb} from './db.js';
export let book_location_id = ""
let form = document.querySelector(".modal-form");
let options = form.querySelectorAll("option");
let books = await getBookLocationsFromDb().then(res => res.json()).then(data =>{
    return data
})

options.forEach( (option) =>{
    books.data.forEach(book =>{
        if(book.location_name === capitalizeFirstLetter(option.value)){
            option.setAttribute("data-location_id",book.location_id)
            book_location_id = book.location_id
            window.localStorage.setItem("user_location_id",book_location_id)
            console.warn(book_location_id)
        }
    });
    
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
