import { getCategories } from "./db.js";
let books_list = document.querySelector(".books-list");
let books_bottom = document.querySelector(".books-bottom");
let search_input = document.querySelector("[data-search]");
let search_form = document.querySelector("[data-search-form]");
let books_container = document.querySelector("[data-book-template]");
let category_template = document.querySelector("[data-category-template]")
let category_list = document.querySelector(".category-list")
let books = [];


// handle search bar error
search_form.addEventListener("submit", e => {
  e.preventDefault();
  let filter_books = document.querySelector("select#filter_books");
  
})

// search bar
const filter_books_by_search = debounce(text => {
  books.forEach(book => {
    let card = book.element;

    const isVisible = book.title.toLowerCase().includes(text.toLowerCase()) || book.subtitle.toLowerCase().includes(text.toLowerCase());

    card.classList.toggle("hide", !isVisible);
  })
})

search_input.addEventListener("input", (e) => {
  
  if (e.target.value === "") {
    books.forEach(book => {
      let card = book.element
      card.classList.remove("hide");
    })
    return
  }
  const text = e.target.value;
  filter_books_by_search(text)
})

function sendJSON(data){
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://147.182.205.177:5000/locations";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

      // Print received data from server
      console.log(this.responseText);

    }
  };

  // Converting JSON data to string

  // Sending data with the request
  xhr.send(JSON.stringify(data));
}



function debounce(callback, delay = 100) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

// name, author, category_id, book_mode, book_page, book_description(min 100), book_price(1000 so'm - 1 million), book_status, book_picture, user_id

// filter books
filter_books.addEventListener("change", (e) => {
  let selected_value = e.currentTarget.value;
  if (selected_value === "all") {
    books.forEach((book) => {
      book.element.classList.remove("hide");
    });
    return;
  }
  books.forEach((book) => {
    let isFiltered = book.price_type === selected_value;
    book.element.classList.toggle("hide", !isFiltered);
  });
});

// render books

let displayMenuItems = (menuItems) => {
  books = menuItems.map((item) => {
    let parsed_price = Math.floor(parseFloat(item.price.replace("$", "")));
    let card = books_container.content.cloneNode(true).children[0];
    let img = card.querySelector("[data-book-img]");
    img.src = item.picture
    let name = card.querySelector("[data-book-name]");
    name.textContent = item.title;
    let desc = card.querySelector(".book-desc");
    desc.textContent = item.subtitle
    let old_price = card.querySelector("[data-book-old-price]");
    old_price.textContent = parsed_price > 0 ? `${parsed_price + 10}$` : "";
    let price = card.querySelector("[data-book-price]");
    price.textContent = `${parsed_price}$`;
    let rent_price = card.querySelector("[data-book-rent-price]");
    rent_price.textContent =
      parsed_price > 0 ? `${Math.floor(parsed_price / 12)}$ / 12 months` : "";
    books_list.append(card);
    //  return the book
    return {
      name: item.name,
      img: item.picture,
      title: item.title,
      price: parsed_price,
      subtitle: item.subtitle,
      element: card,
      price_type: parsed_price < 30 ? "low_price" : "high_price",
    };
  });
};


// render categories
const renderCategories = async()=>{
  let categories = await getCategories().then(res => res.json()).then(data =>{
    return data
  })
  categories.data.forEach(category =>{
    let category_item = category_template.content.cloneNode(true).children[0]
    category_item.dataset.id = category.category_id
    category_item.children[0].textContent = category.category_name
    category_list.append(category_item)
  })
}

renderCategories()

// fetch("https://api.itbook.store/1.0/search/mongodb")
//   .then((res) => res.json())
//   .then((data) => {
//     console.warn(books)
//     displayMenuItems(data.books);
//     displayCategories(data.books)
//   });


// // send data
// fetch("https://api.itbook.store/1.0/search/mongodb")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// export default displayMenuItems;