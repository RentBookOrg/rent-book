import { getCategories, getBooksByLocation, get_UserId, buyBook, rentBook, get_UserInfo, getBookLocationsFromDb } from "./db.js";
let books_list = document.querySelector(".books-list");
let books_bottom = document.querySelector(".books-bottom");
let search_input = document.querySelector("[data-search]");
let search_form = document.querySelector("[data-search-form]");
let books_container = document.querySelector("[data-book-template]");
let category_template = document.querySelector("[data-category-template]")
let category_list = document.querySelector(".category-list")
let category_items = category_list.querySelectorAll("li");
let order_section = document.querySelector(".order-form-section");
let order_form = document.querySelector(".order-form");
let order_submit_btn = document.querySelector(".order-submit-btn");
let books = [];




order_submit_btn.addEventListener("click", async (e) => {
  e.stopPropagation()
  e.stopImmediatePropagation()
  e.preventDefault();
  let user_name = order_section.querySelector("#user_name"),
    user_surname = order_section.querySelector("#user_surname"),
    user_phone = order_section.querySelector("#user_phone"),
    user_email = order_section.querySelector("#user_email"),
    user_return_date = order_section.querySelector("#user_return_date")
  let locations = await getBookLocationsFromDb().then(res => res.json()).then(data => {
    return data.data
  })
  let send_data = { name: user_name.value, surname: user_surname.value, phone: user_phone.value, email: user_email.value, order_mode: order_form.dataset.mode }
  locations.forEach(location => {
    if (location.location_id === window.localStorage.getItem("user_location_id")) {
      send_data.address = location.location_name
    }
  })
  console.log(send_data);
  let order_data
  if (order_form.dataset.mode === "buy") {
    order_data = await buyBook(send_data, order_form.dataset.book_id).then(res => res.json()).then(data => {
      return data
    })
  } else {
    send_data.order_returning_date = user_return_date.value
    order_data = await rentBook(send_data, order_form.dataset.book_id).then(res => res.json()).then(data => {
      return data;
    })
  }
  console.log(order_data);
  order_section.style.display = "none";


})



// handle search bar error
search_form.addEventListener("submit", e => {
  e.preventDefault();
  let filter_books = document.querySelector("select#filter_books");

})

// search bar
const filter_books_by_search = debounce(text => {
  books.forEach(book => {
    console.log(book);
    let card = book.element;

    const isVisible = book.name.toLowerCase().includes(text.toLowerCase()) || book.subtitle.toLowerCase().includes(text.toLowerCase());

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

function sendJSON(data) {
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



function debounce(callback, delay = 1000) {
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

let displayMenuItems = (menuItems) => {
  books = menuItems.map((item) => {
    if(!item.book_available) return;
    let parsed_price = item.book_mode === "rent" ? `${item.book_rent_prize} so'm/12 oy` : `${item.book_prize} so'm`;
    let card = books_container.content.cloneNode(true).children[0];
    card.dataset.id = item.book_id
    let img = card.querySelector("[data-book-img]");
    img.setAttribute("src", `http://147.182.205.177:5000/${item.book_picture}`);
    let name = card.querySelector("[data-book-name]");
    name.textContent = item.book_name;
    let desc = card.querySelector(".book-desc");
    desc.textContent = item.book_description
    let price = card.querySelector("[data-book-price]");
    price.textContent = `${parsed_price}`;
    let order_btn = card.querySelector(".order-btn");
    // let rent_btn = card.querySelector(".rent-btn");
    order_btn.addEventListener("click", async () => {
      order_form.dataset.mode = "buy"
      order_form.dataset.book_id = card.dataset.id;
      order_section.style.display = "block";
    })
    // rent_btn.addEventListener("click", async () => {
    //   order_form.dataset.mode = "rent"
    //   order_form.dataset.book_id = card.dataset.id;
    //   order_section.style.display = "block";
    // })
    card.dataset.category_id = item.category_id;

    books_list.append(card);
    //  return the book
    return {
      name: item.book_name,
      img: item.picture,
      title: item.book_name,
      price: item.book_prize,
      subtitle: item.book_description,
      element: card,
      price_type: item.book_prize <= 40000 ? "low_price" : "high_price",
    };
  });
};

let displayCategories = async(category_id) => {
  await getCategories().then(res => res.json()).then(data => {
    data.data.forEach(category => {
      let template = category_template.content.cloneNode(true).children[0];
      console.log(category_id, category.category_id);
      if(category_id === category.category_id){
        template.textContent = category.category_name;
        category_list.append(template);
      }
      let all_books = category_list.querySelector(".category-item");
      all_books.addEventListener("click",()=>{
        books.forEach(book => {
          book.element.classList.remove("hide");
        })
      })
      template.addEventListener("click",(e)=>{
        books.forEach(book => {
          let isVisible = book.element.dataset.category_id === category.category_id;
          book.element.classList.toggle("hide",!isVisible)
        })
      })
    })
  })
}

let isUserLocated
if (window.localStorage.getItem("user_location_id")) {
  isUserLocated = true
} else {
  isUserLocated = false
}

if (isUserLocated) {
  await getBooksByLocation().then(res => res.json()).then(data => {
    data.data.forEach(item => {
      displayCategories(item.category_id);
    })
    displayMenuItems(data.data)
  })
}

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

export default displayMenuItems;