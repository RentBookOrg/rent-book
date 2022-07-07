import {getBookLocationsFromDb} from './db.js';
import { getBooksById } from './db.js';
import displayMenuItems from './render.js'


const USER_LOCATION_ID = window.localStorage.getItem("user_location_id");
let modal = document.querySelector(".modal");
let form = document.querySelector(".modal-form");
let options = form.querySelectorAll("option");
let location_select = document.querySelector(".location_select");
let modalBtn = document.querySelector(".modal-btn");
let user = {}

// check if user has already chosen his/her location before
if(USER_LOCATION_ID){
    modal.style.display = "none"
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (location_select.value === "O'z hududingizni tanlang") return
})

if (!modal.style.display === "none") {
    document.body.style.overflow = "visible"
}

location_select.addEventListener("change", () => {
    modalBtn.classList.remove("not-allowed")
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

modalBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (location_select.value === "O'z hududingizni tanlang") return
    options.forEach( async(option) =>{
        if(capitalizeFirstLetter(option.value) === capitalizeFirstLetter(location_select.value)){
            let books_by_id = await getBooksById(option.dataset.location_id).then(res => res.json()).then(data => {
                return data
            });
            console.log(option.dataset.location_id);
            book_location_id = `${option.dataset.location_id}`
            console.log(typeof book_location_id);
            let filtered_books = await getBooksById(book_location_id).then(res => res.json()).then(data => {
                console.log(data);
                return data
            })

        }
    })
    
    modal.style.display = "none"
    document.body.style.overflow = "visible"
    console.log(user);
})

function navigateToCabinet() {
    let cabinet_btn = document.querySelector(".cabinet-btn")
    cabinet_btn.addEventListener("click", () => {
        location.href = "./views/register.html"
    })
}

navigateToCabinet();

