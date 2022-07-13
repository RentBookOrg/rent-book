import { getCategories, getBooksByLocation, get_UserId, buyBook, rentBook, get_UserInfo, getBookLocationsFromDb, getBooksById } from "./db.js";
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
let form = document.querySelector(".modal-form");
let options = form.querySelectorAll("option");
let verify_message = document.querySelector(".verify-message");
let verify_text = verify_message.querySelector("p");
let cancel_btn = document.querySelector(".cancel-order");

cancel_btn.addEventListener("click", () => {
  order_section.style.display = "none";
})

let locations = await getBookLocationsFromDb().then(res => res.json()).then(data => {
  return data.data
})

options.forEach((option) => {

  locations.forEach(async (location) => {
    if (location.location_name.replace("'", "") === capitalizeFirstLetter(option.value)) {
      option.setAttribute("data-location_id", location.location_id)
      let book_location_id = location.location_id
    }
  });

})






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
   (send_data);
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
   (order_data);
  order_section.style.display = "none";


})



// handle search bar error
search_form.addEventListener("submit", e => {
  e.preventDefault();
  let filter_books = document.querySelector("select#filter_books");

})

// search bar
const filter_books_by_search = debounce(text => {

  // if(text.length === 1)
  books.forEach(book => {
    if (book == undefined) return
    let card = book.element;

    // const isVisible = book.name.toLowerCase().includes(text.toLowerCase()) || book.subtitle.toLowerCase().includes(text.toLowerCase());
    let pattern = new RegExp(text, 'g');
    let data = book.name.toLowerCase().match(pattern);
    let isVisible = data != null
    card.classList.toggle("hide", !isVisible);
  })
})

search_input.addEventListener("input", (e) => {

  
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
       (this.responseText);

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

export let displayMenuItems = (menuItems) => {
  books = menuItems.map((item) => {
    if (!item.book_available) return;
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

export let displayCategories = async (category_id) => {
  await getCategories().then(res => res.json()).then(data => {
    data.data.forEach(category => {
      let template = category_template.content.cloneNode(true).children[0];
      if (category_id === category.category_id) {
        template.textContent = category.category_name;
        category_list.append(template);
      }
      let all_books = category_list.querySelector(".category-item");
      all_books.addEventListener("click", () => {
        books.forEach(book => {
          book.element.classList.remove("hide");
        })
      })
      template.addEventListener("click", (e) => {
        books.forEach(book => {
          let isVisible = book.element.dataset.category_id === category.category_id;
          book.element.classList.toggle("hide", !isVisible)
        })
      })
    })
  })
}


const USER_LOCATION_ID = window.localStorage.getItem("user_location_id");
let modal = document.querySelector(".modal");
let location_select = document.querySelector(".location_select");
let modalBtn = document.querySelector(".modal-btn");
let user = {}

// check if user has already chosen his/her location before
if (USER_LOCATION_ID) {
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
   (location_select.value);
  locations.forEach(location => {
     (location.location_name.replace("'", ""), capitalizeFirstLetter(location_select.value));
    if (location.location_name === location_select.value) {
       ("Match");
      window.localStorage.setItem("user_location_id", location.location_id);
      window.localStorage.setItem("user_location", location.location_name);

      return
    }
  })
  modalBtn.classList.remove("not-allowed")
})



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

modalBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (location_select.value === "O'z hududingizni tanlang") return
  let book_location_id
  options.forEach(async (option) => {
    if (capitalizeFirstLetter(option.value) === capitalizeFirstLetter(location_select.value)) {
      let books_by_id = await getBooksById(option.dataset.location_id).then(res => res.json()).then(data => {
        data.data.forEach(item => {
          if (!item.book_available) return
          displayCategories(item.category_id)
        })
         (data);
        if (data.message === "Currently books are not available in your area. Please, check other areas books") {
          books_list.style.pointerEvents = "none"
          verify_message.style.display = "block";
          verify_text.textContent = "Currently books are not available in your area. Due to our criterias, you can't buy or rent any books. But you can see all available books that we have"
        }
        return data.data
      });
      displayMenuItems(books_by_id)
       (option.dataset.location_id);
      book_location_id = option.dataset.location_id
      window.localStorage.setItem("user_location_id", book_location_id);
       (typeof book_location_id);
      // let filtered_books = await getBooksById(book_location_id).then(res => res.json()).then(data => {
      //      (data);
      //     return data
      // })

    }
  })

  modal.style.display = "none"
  document.body.style.overflow = "visible"
  location_select.value = "";
   (user);
})


let isUserLocated
if (window.localStorage.getItem("user_location_id")) {
  isUserLocated = true
} else {
  isUserLocated = false
}

if (isUserLocated) {
   (USER_LOCATION_ID);
  await getBooksById(USER_LOCATION_ID).then(res => res.json()).then(data => {
    data.data.forEach(item => {
      if (!item.book_available) return
      displayCategories(item.category_id)
    })
     (data);
    if (data.message === "Currently books are not available in your area. Please, check other areas books") {
      books_list.style.pointerEvents = "none"
      verify_message.style.display = "block";
      verify_text.textContent = "Currently books are not available in your area. Due to our criterias, you can't buy or rent any books. But you can see all available books that we have"
    }
    displayMenuItems(data.data)
  })

}
if (isUserLocated) {

}

function navigateToCabinet() {
  let cabinet_btn = document.querySelector(".cabinet-btn")
  cabinet_btn.addEventListener("click", () => {
    location.href = "./views/cabinet.html"
  })
}

navigateToCabinet();



// let isUserLocated
// if (window.localStorage.getItem("user_location_id")) {
//   isUserLocated = true
// } else {
//   isUserLocated = false
// }

// if (isUserLocated) {

// }
// if(isUserLocated){
//   await getBooksByLocation(window.localStorage.getItem("user_location_id")).then(res => res.json()).then(data => {
//     try{
//        (data);
//       data.data.forEach(item => {
//         displayCategories(item.category_id);
//       })
//       displayMenuItems(data.data)
//     }
//     catch(error){
//        (error);
//     }
//   })  
// }


