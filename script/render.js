let books_list = document.querySelector(".books-list");
let books_container = document.querySelector("[data-book-template]");
let categories = document.querySelector("[data-category-template]");
let books = [];

let displayMenuItems = (menuItems) => {
  books = menuItems.map((item) => {
    let parsed_price = Math.floor(parseFloat(item.price));
    console.log(item);
    let card = books_container.content.cloneNode(true).children[0];

    let item_top = card.querySelector(".item-top");
    item_top.append(item.image);
    item.image.width = 160
    item.image.height = 160
    item.image.classList.add("item-img")
    let name = card.querySelector("[data-book-name]");
    name.textContent = item.title;
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

function getImg(src) {
  return `<img
  class="item-img"
  src="${src}"
  data-book-img
  alt="Template image"
  width="160"
  height="160"
/>`
}

export default displayMenuItems;
