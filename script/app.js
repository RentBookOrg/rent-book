let books_list = document.querySelector(".books-list");
let books_bottom = document.querySelector(".books-bottom");
let search_input = document.getElementById("search");
let books_container = document.querySelector("[data-book-template]");
let users = []

let displayMenuItems = (menuItems) => {
    users = menuItems.map(item => {
       let parsed_price = Math.floor(parseFloat(item.price.replace("$", "")));
       card = books_container.content.cloneNode(true).children[0];
       let img = card.querySelector("[data-book-img]");
       img.setAttribute("src",item.image);
       let name = card.querySelector("[data-book-name]")
       name.textContent = item.title
       let old_price = card.querySelector("[data-book-old-price]")
       old_price.textContent = parsed_price > 0 ? `${parsed_price + 10}$` : ""
       let price = card.querySelector("[data-book-price]")
       price.textContent = `${parsed_price}$`
       let rent_price = card.querySelector("[data-book-rent-price]")
       rent_price.textContent = parsed_price > 0 ? `${Math.floor(parsed_price / 12)}$ / 12 months` : ""
       books_list.append(card)

      //  return the user
      return {name:item.name, img:item.img, title:item.title, price:item.price, subtitle:item.subtitle}
    })
}

// search bar
search_input.addEventListener("input",(e)=>{
  let text = e.currentTarget.value;

})

fetch("https://api.itbook.store/1.0/search/mongodb")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.books);
    displayMenuItems(data.books)
    
  });