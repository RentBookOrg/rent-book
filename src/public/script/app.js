let books_list = document.querySelector(".books-list");
let books_bottom = document.querySelector(".books-bottom");
let search_input = document.querySelector("[data-search]");
let books_container = document.querySelector("[data-book-template]");
let categories = document.querySelector("[data-category-template]")
let category_list = document.querySelector(".category-list")
let books = [];
let filter_books = document.querySelector("select#filter_books");


// search bar
const filter_books_by_search = debounce(text =>{
  books.forEach(book =>{
    let card = book.element;
    
    const isVisible = book.title.toLowerCase().includes(text.toLowerCase()) || book.subtitle.toLowerCase().includes(text.toLowerCase());

    card.classList.toggle("hide",!isVisible);
  })
})

search_input.addEventListener("input",(e)=>{
  if(e.target.value === "") return
  const text = e.target.value;
  filter_books_by_search(text)
})


function debounce(callback, delay = 1000){
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(()=>{
      callback(...args)
    },delay)
  }
}



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
    img.src = item.image
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
      img: item.img,
      title: item.title,
      price: parsed_price,
      subtitle: item.subtitle,
      element: card,
      price_type: parsed_price < 30 ? "low_price" : "high_price",
    };
  });
};


// render categories

let displayCategories = (menuItems) => {
  menuItems.map(item => {
    let category = categories.content.cloneNode(true).children[0];
    let anchor = category.querySelector(".category-link");
    anchor.textContent = item.category
    category_list.append(category)
  })
}

fetch("https://api.itbook.store/1.0/search/mongodb")
  .then((res) => res.json())
  .then((data) => {
    displayMenuItems(data.books);
    displayCategories(data.books)
  });

// send data
fetch("https://api.itbook.store/1.0/search/mongodb")
  .then((response) => response.json())
  .then((data) => console.log(data));

export default displayMenuItems;