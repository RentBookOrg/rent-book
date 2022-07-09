// import {get_UserInfo} from './db.js'


// let book_template = document.querySelector("[data-book-template]").content.cloneNode(true);
// let order_btn = book_template.querySelectorAll(".order-btn");
// let rent_btn = book_template.querySelectorAll(".rent-btn");
// console.log(order_btn);

// order_btn.addEventListener("click",(e)=>{
//     if(!window.localStorage.getItem("user_id")){
//         alert("Please sign up or login in!");
//         return
//     }
//     let user_data = get_UserInfo(window.localStorage.getItem("user_id")).then(res => res.json()).then(data => {
//         return data;
//     })

//     console.log(user_data);
// })