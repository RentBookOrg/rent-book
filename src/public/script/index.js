// import {getBookLocationsFromDb, getBooksByLocation} from './db.js';
// import { getBooksById } from './db.js';
// import { displayCategories, displayMenuItems } from './app.js';


// const USER_LOCATION_ID = window.localStorage.getItem("user_location_id");
// let modal = document.querySelector(".modal");
// let form = document.querySelector(".modal-form");
// let options = form.querySelectorAll("option");
// let location_select = document.querySelector(".location_select");
// let modalBtn = document.querySelector(".modal-btn");
// let user = {}

// // check if user has already chosen his/her location before
// if(USER_LOCATION_ID){
//     modal.style.display = "none"
// }

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     if (location_select.value === "O'z hududingizni tanlang") return
// })

// if (!modal.style.display === "none") {
//     document.body.style.overflow = "visible"
// }

// let locations

// locations = await getBookLocationsFromDb().then(res => res.json()).then(data => {
//   return data.data
// })

// location_select.addEventListener("change", () => {
//     console.log(location_select.value);
//     locations.forEach(location => {
//         console.log(location.location_name.replace("'",""), capitalizeFirstLetter(location_select.value));
//         if(location.location_name === location_select.value){
//             console.log("Match");
//             window.localStorage.setItem("user_location_id",location.location_id);
//             window.localStorage.setItem("user_location",location.location_name);

//             return
//         }
//     })
//     modalBtn.classList.remove("not-allowed")
// })



// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

// modalBtn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     if (location_select.value === "O'z hududingizni tanlang") return
//     let book_location_id
//     options.forEach( async(option) =>{
//         if(capitalizeFirstLetter(option.value) === capitalizeFirstLetter(location_select.value)){
//             let books_by_id = await getBooksById(option.dataset.location_id).then(res => res.json()).then(data => {
//                 console.log(data);
//                 return data.data
//             });
//             displayMenuItems(books_by_id)
//             console.log(option.dataset.location_id);
//             book_location_id = option.dataset.location_id
//             window.localStorage.setItem("user_location_id",book_location_id);
//             console.log(typeof book_location_id);
//             // let filtered_books = await getBooksById(book_location_id).then(res => res.json()).then(data => {
//             //     console.log(data);
//             //     return data
//             // })

//         }
//     })
    
//     modal.style.display = "none" 
//     document.body.style.overflow = "visible"
//     location_select.value = "";
//     console.log(user);
// })


// let isUserLocated
// if (window.localStorage.getItem("user_location_id")) {
//   isUserLocated = true
// } else {
//   isUserLocated = false
// }

// if (isUserLocated) {

// }
// if(isUserLocated){
  
// }

// function navigateToCabinet() {
//     let cabinet_btn = document.querySelector(".cabinet-btn")
//     cabinet_btn.addEventListener("click", () => {
//         location.href = "./views/register.html"
//     })
// }

// navigateToCabinet();

