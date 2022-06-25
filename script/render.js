let books_list = document.querySelector(".books-list");
let books_container = document.querySelector("[data-book-template]");
let categories = document.querySelector("[data-category-template]");
let books = [];

let displayMenuItems = (menuItems) => {
  books = menuItems.map((item) => {
    let parsed_price = Math.floor(parseFloat(item.price.replace("$", "")));
    let card = books_container.content.cloneNode(true).children[0];
    let img = card.querySelector("[data-book-img]");
    img.setAttribute("src", item.image);
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

export default displayMenuItems;
