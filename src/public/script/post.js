import { get_UserId, get_UserInfo, resend_verification, getCategories } from './db.js';
import displayMenuItems from './render.js'

const CATEGORIES_SELECT = document.querySelector(".books_category_list")
let books_list = document.querySelector(".books-list");
let books_section = document.querySelector(".user-books")
let post_btn = document.querySelector(".post-btn");
let post_section = document.querySelector(".post-section")
let form_field = document.querySelector("[data-post-form]")
let comments_btn = document.querySelector(".comments-btn");
let error_div = document.querySelector(".error-message");
let error_message = error_div.querySelector(".error-text");
let verify_message = document.querySelector(".verify-message");
let verify_btn = document.querySelector(".resend-btn");
let cabinet_username = document.querySelector(".cabinet-username");
let arrows = document.querySelectorAll(".post-section button");
let heading = document.createElement("h1");
let books = []
let book = {}


// check if user's email is verified or not
window.addEventListener("DOMContentLoaded", async (e) => {

  // render categories
  let categories = await getCategories().then(res => res.json()).then(data =>{
    return data
  })
  categories.data.forEach(category =>{
    // add categories to option
    let option = document.createElement("option");
    option.classList.add("books_category_item");
    option.value = category.category_name;
    option.textContent = category.category_name;
    option.dataset.category_id = category.category_id;
    CATEGORIES_SELECT.append(option)

  })

  let userData = await get_UserInfo(window.localStorage.getItem("user_id")).then(res => res.json()).then(data => {
    return data;
  })
  if (userData.data.user_verified == true) {
    verify_message.style.display = "none";
    cabinet_username.textContent = `Hello, ${userData.data.name}`
    post_btn.style.display = "block"
    comments_btn.style.display = "block"
  } else {
    post_btn.style.display = "none"
    comments_btn.style.display = "none"
  }

})

// verify button click
verify_btn.addEventListener("click", async () => {
  console.log(window.localStorage.getItem("user_id"));
  let resend_data = await resend_verification(window.localStorage.getItem("user_id")).then(res => res.json()).then(data => {
    return data
  })
  console.log(resend_data);
})

form_field.addEventListener("submit", (e) => {
  console.log("WTF");
  e.preventDefault();
})

// add click event to post btn. when the user clicks on the post button, a form window is gonna open and the user is gonna fill all the information about the book
post_btn.addEventListener("click", () => {
  post_section.style.display = "block";
  form_field.style.display = "block"
  heading.style.display = "none";
  let name_input = document.querySelector(".field-name");
  name_input.classList.add("active")
  name_input.classList.remove("inactive");
})

function resetInputs() {

}


arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {

    e.preventDefault();
    let input = arrow.previousElementSibling;
    let parent = arrow.parentElement;
    let nextForm = parent.nextElementSibling;
    input.value = ""
    if (
      (input.name === "name" && validate_name(input))
      ) {
        nextSlide(parent, nextForm);
        book.book_name = input.value;
      }
      else if (input.name === "book_author" && validate_name(input)) {
      error_div.style.display = "none";
      nextSlide(parent, nextForm);
      book.book_author = input.value;
    }
    else if (input.name === "book_category" && validate_category(input.value)) {
      error_div.style.display = "none";
      nextSlide(parent, nextForm);
    }
    else if (input.name === "book_mode") {
      nextSlide(parent, nextForm)
    }
    else if (input.name === "book_mode") {
      nextSlide(parent, nextForm)
    }
    else if (input.name === "book_page") {
      nextSlide(parent, nextForm)
    }
    else if (input.name === "book_description") {
      nextSlide(parent, nextForm)
    } else if (input.name === "book_price") {
      nextSlide(parent, nextForm);
    } else if(input.name === "book_count"){
      nextSlide(parent,nextForm);
    }
    else if (input.type === "file") {
      error_div.style.display = "none";
      ;
      /*  const reader = new FileReader();
       reader.readAsDataURL(input.files[0])
       let img = document.createElement("img")
       reader.addEventListener("load", () => {
         img.src = reader.result;
       }) */
      book.book_picture = input.value
      input.value = ""
      parent.classList.remove("active");
      parent.classList.add("inactive");
      book.location_id = window.localStorage.getItem
        ("user_location_id")
      // book_name: req.body.book_name,
      // book_author: req.body.book_author,
      // category_id: req.body.category_id,
      // book_mode: req.body.book_mode,
      // book_page: req.body.book_page,
      // book_description: req.body.book_description,
      // book_prize: req.body.book_prize,  
      // book_rent_prize: req.body.book_rent_prize,
      // book_language: req.body.book_language,
      // book_count: req.body.book_count,
      // book_status: req.body.book_status,
      // book_picture: req.files.file.name,
      // user_id: req.params.user_id

      book.book_mode = "sell";
      book.book_page = 150;
      book.book_description = "Учрашувда президент асосий қонунга қатор нормаларни киритиш бўйича таклифлар илгари сурди. Kun.uz мазкур таклифларни санаб ўтади.Фуқароларнинг ҳуқуқ ва эркинликлари йўналишида:Ўзбекистон фуқароси мамлакат бўйлаб эркин ҳаракатланиш, турар ёки яшаш жойини эркин танлаш ҳуқуқига эга (прописка чекловлари қайтиб ҳеч қачон тикланмайди);ҳар бир фуқарога мамлакатдан тўсиқларсиз чиқиш ва қайтиш ҳуқуқи кафолатланади;шахсий ҳаёт дахлсизлиги кафолатланади;мажбурий меҳнат ва болалар меҳнатига йўл қўйилмайди;ҳар бир шахс қулай меҳнат шароитида ишлаш, меҳнати учун муносиб ҳақ олиш ҳуқуқига эга;меҳнатга ҳақ тўлашнинг энг кам миқдори инсоннинг ўзи ва оиласи ҳаёт кечириши учун етарли миқдорда бўлиши керак."
      book.book_rent_prize = book.book_prize - 10
      book.book_language = "uz"
      book.book_count = 1;
      book.category_id = "baef957d-7d60-41cf-bba5-aa0295cb2e3a"
      book.book_status = "active"
      book.user_id = window.localStorage.getItem("user_id");
      console.log(book.user_id);
      books.push(book);
      fetch(`http://147.182.205.177:5000/book/${book.user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      }).then(res => res.json()).then(data => console.log(data))
      displayMenuItems([book])
      post_section.style.display = "none"
    }
  });
});

// validate book name -> the name of the book must be longer than 2 characters
function validate_name(book) {
  if (book.value.length >= 3) {
    error_div.style.display = "none !important";
    return true
  }
  return false;
}

function validate_category(category) {
  return category.length >= 6;
}

function error(text) {
  console.log("i am inside of the error function");
  error_div.style.display = "block";
  error_div.style.backgroundColor = "crimson";
  error_message.textContent = text
}

function nextSlide(current, parent) {
  current.classList.add("inactive");
  current.classList.remove("active");
  parent.classList.add("active");
}

// check if user has any books
function checkBooks() {

  heading.classList.add("no_books_title");
  heading.textContent = "You don't have any books available right now. Click on the button below to post your first book";
  if (books.length === 0) {
    comments_btn.style.display = "none";
    document.body.append(heading);
  }
}

function App() {
  checkBooks()
}

function deleteBtn() {
  let trash_btn = document.querySelector('.trash-btn')
  trash_btn.addEventListener("click", () => {

  })
}

