import { getBookLocationsFromDb, getBooksByLocation, login } from './db.js';

let form = document.querySelector(".modal-form");
let options = form.querySelectorAll("option");
let isUserLocated
if (window.localStorage.getItem("user_location_id")) {
    isUserLocated = true
} else {
    isUserLocated = false
}
console.log(isUserLocated);
let locations

locations = await getBookLocationsFromDb().then(res => res.json()).then(data => {
    return data
})




function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

