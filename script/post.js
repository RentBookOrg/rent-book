import displayMenuItems from './render.js'
let arrows = document.querySelectorAll(".form-btn");
let books = []
arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    e.preventDefault();
    let input = arrow.previousElementSibling;
    let parent = arrow.parentElement;
      let nextForm = parent.nextElementSibling;
      let book = {}
      if (
          (input.name === "name" && validate_name(input))
      ) {
          nextSlide(parent, nextForm);
          book.name = input.value;
      } else if (input.name === "book_author" && validate_name(input)) {
          nextSlide(parent, nextForm);
          book.author = input.value;
      }
      else if (input.name === "book_category" && validate_category(input.value)) {
          nextSlide(parent, nextForm);
          book.category = input.value;
      } else {
          let form = document.querySelector(".form-field");
          book.price = `${input.value}`
          form.style.display = "none"
          books.push(book);
          displayMenuItems(books)
      }
  });
});

// validate book name -> the name of the book must be longer than 2 characters
function validate_name(book) {
  console.log(book.value);
  return book.value.length >= 3;
}

function validate_category(category) {
  return category.length >= 6;
}

function error(color) {}

function nextSlide(current, parent) {
  current.classList.add("inactive");
  current.classList.remove("active");
  parent.classList.add("active");
}