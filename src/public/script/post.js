import { get_UserId, get_UserInfo, resend_verification, getCategories, getUserBooks, deleteBook } from './db.js';
import displayMenuItems from './render.js'

let tl = gsap.timeline()

tl.to(".site-header",{
  opacity:1,
  pointerEvents:"all",
  duration:0.5
}).to(".user-books",{
  opacity:1,
  pointerEvents:"all",
  duration:1
})

const CATEGORIES_SELECT = document.querySelector(".books_category_list")
let books_list = document.querySelector(".books-list");
let books_section = document.querySelector(".user-books")
let post_btn = document.querySelector(".post-btn");
let post_section = document.querySelector(".post-section")
let form_field = document.querySelector("[data-post-form]")
// let comments_btn = document.querySelector(".comments-btn");
let error_div = document.querySelector(".error-message");
let error_message = error_div.querySelector(".error-text");
let verify_message = document.querySelector(".verify-message");
let verify_btn = document.querySelector(".resend-btn");
let cabinet_username = document.querySelector(".cabinet-username");
let arrows = document.querySelectorAll(".post-section button");
let book_template = document.querySelector("[data-book-template]")
let orders_list = document.querySelector(".orders-list");
let saved_order_template = document.querySelector("[data-saved-order]");
let heading = document.createElement("h1");
let books = []
let book = {}


// check if user's email is verified or not
window.addEventListener("DOMContentLoaded", async (e) => {

  // get user books
  await getUserBooks().then(res => res.json()).then(data => {
    data.data.forEach(book => {
      console.log(book);
      let book_item = book_template.content.cloneNode(true);
      let book_link = book_item.querySelector(".book-link");
      let book_description = book_item.querySelector(".book-desc");
      let book_price = book_item.querySelector(".book-price");
      let book_img = book_item.querySelector("[data-book-img]");
      let trash_btn = book_item.querySelector("[data-delete-btn]")
      let item = book_item.querySelector("li");
      item.dataset.id = book.book_id
      
      trash_btn.addEventListener("click",async(e)=>{
        await deleteBook(window.localStorage.getItem("user_id"),e.target.parentElement.parentElement.dataset.id).then(res => res.json()).then(data => {
          if(data.status === 200){
            item.remove()
          }
        })
      })
      book_img.setAttribute("src", `http://147.182.205.177:5000/${book.book_picture}`)
      book_link.textContent = book.book_name
      book_description.textContent = book.book_description
      book_price.textContent = book.book_prize + " so'm";
      books_list.append(book_item)
    })
  })

  // render categories
  let categories = await getCategories().then(res => res.json()).then(data => {
    return data
  })
  categories.data.forEach(category => {
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
    // comments_btn.style.display = "block"
  } else {
    post_btn.style.display = "none"
    // comments_btn.style.display = "none"
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
    let files = new FormData()

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
    else if (input.name === "book_category_list" && input.value !== "Choose category") {
      [...input.children].forEach(child => {
        if (child.value === input.value) {
          book.category_id = child.dataset.category_id;
          files.append("category_id", input.value)

        }
      })
      nextSlide(parent, nextForm);
      error_div.style.display = "none";
    }
    else if (input.name === "book_mode") {
      if (input.parentElement.children[1].checked != true && input.parentElement.children[3].checked != true) {
        console.log("You didn't select anything!");
        return
      }
      console.log(input.children);
      [...input.parentElement.children].forEach(child => {
        if (child.checked == true) {
          book.book_mode = child.value
          files.append("book_mode", input.value)

        }
      })
      nextSlide(parent, nextForm)
    }
    else if (input.name === "book_page") {
      book.book_page = input.value
      files.append("book_page", input.value)

      nextSlide(parent, nextForm)
    }
    else if (input.name === "book_description") {
      book.book_description = input.value
      files.append("book_description", input.value)

      nextSlide(parent, nextForm)
    } else if (input.name === "book_price") {
      book.book_prize = input.value
      files.append("book_prize", input.value)

      nextSlide(parent, nextForm);
    } else if (input.name === "book_count") {
      book.book_count = input.value
      files.append("book_count", input.value)

      nextSlide(parent, nextForm);
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

      parent.classList.remove("active");
      parent.classList.add("inactive");
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
      book.book_rent_prize = book.book_prize - 10
      book.book_language = "uz"
      book.book_status = "active"
      console.log(Object.fromEntries(files));
      files.append("book_name", book.book_name)
      files.append("book_author", book.book_author)
      files.append("category_id", book.category_id)
      files.append("book_mode", book.book_mode)
      files.append("book_page", book.book_page)
      files.append("book_description", book.book_description)
      files.append("book_prize", book.book_prize)
      files.append("book_rent_prize", book.book_prize - 10)
      files.append("book_language", "Uzbek")
      files.append("book_count", parseInt(book.book_count))
      files.append("book_status", "New")
      files.append("file", input.files[0])
      console.log(Object.fromEntries(files));

      console.log(typeof files.get("book_count"));
      fetch(`http://147.182.205.177:5000/book/${localStorage.getItem("user_id")}`, {
        method: "POST",
        body: files,

      }).then(res => res.json()).then(data => console.log(data))
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