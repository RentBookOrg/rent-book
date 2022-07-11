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





options.forEach((option) => {

    locations.data.forEach(location => {
        if (location.location_name === capitalizeFirstLetter(option.value)) {
            option.setAttribute("data-location_id", location.location_id)
            let book_location_id = location.location_id
            window.localStorage.setItem("user_location_id", book_location_id)
        }
    });

})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

