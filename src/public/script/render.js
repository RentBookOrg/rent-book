import {getBooksById} from './db.js'
let books_list = document.querySelector(".books-list");
let books_container = document.querySelector("[data-book-template]");
let categories = document.querySelector("[data-category-template]");
let books = [];

async function renderBooksByLocation(location_id){
    let renderedBooks = await getBooksById(window.localStorage.getItem("user_location_id")).then(res => res.json()).then(data => console.log(data))
    console.log(renderedBooks);
}

let displayMenuItems = (menuItems) => {
  books = menuItems.map((item) => {
    if(item.length === 0) return
    let parsed_price = Math.floor(parseFloat(item.price));
    let card = books_container.content.cloneNode(true).children[0];
    // let item_top = card.querySelector(".item-top");
    // item_top.append(item.book_picture);
    // item.book_picture.width = 160
    // item.book_picture.height = 160
    // item.book_picture.classList.add("item-img")
    let name = card.querySelector("[data-book-name]");
    name.textContent = item.name;
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


export default displayMenuItems;
