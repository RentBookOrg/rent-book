import displayMenuItems from './render.js'
let arrows = document.querySelectorAll(".form-btn");
let books_list = document.querySelector(".books-list");
let books_section = document.querySelector(".user-books")
let post_btn = document.querySelector(".post-btn");
let post_section = document.querySelector(".post-section")
let comments_btn = document.querySelector(".comments-btn");
let error_div = document.querySelector(".error-message");
let error_message = error_div.querySelector(".error-text");
let heading = document.createElement("h1");
let books = []
let book = {}

// add click event to post btn. when the user clicks on the post button, a form window is gonna open and the user is gonna fill all the information about the book
post_btn.addEventListener("click", () => {
  post_section.style.display = "block";
  heading.style.display = "none";
})

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    e.preventDefault();
    let input = arrow.previousElementSibling;
    let parent = arrow.parentElement;
    let nextForm = parent.nextElementSibling;

    if (
      (input.name === "name" && validate_name(input))
    ) {
      console.log("still in this input");
      nextSlide(parent, nextForm);
      book.name = input.value;
    }
    else if (input.name === "book_author" && validate_name(input)) {
      error_div.style.display = "none";
      nextSlide(parent, nextForm);
      book.author = input.value;
      console.log(book);


    }
    else if (input.name === "book_category" && validate_category(input.value)) {
      error_div.style.display = "none";
      nextSlide(parent, nextForm);
      book.category = input.value;

    }
    else if (input.name === "book_price") {
      error_div.style.display = "none";

      book.price = `${input.value}`
      nextSlide(parent, nextForm);

    }
    else if (input.type === "file") {
      error_div.style.display = "none";
      ;
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0])
      let img = document.createElement("img")
      reader.addEventListener("load", () => {
        img.src = reader.result;
      })
      book.image = img

      let form = document.querySelector(".form-field");
      form.style.display = "none"
      books.push(book);
      console.log(book.image);
      displayMenuItems(books)
    }
  });
});


// validate book name -> the name of the book must be longer than 2 characters
function validate_name(book) {
  console.log(book.value);
  if (book.value.length >= 3) {
    error_div.style.display = "none !important";
    console.log("i am inside");
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

checkBooks();