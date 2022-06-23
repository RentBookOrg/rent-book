let books_list = document.querySelector(".books-list");
let books_bottom = document.querySelector(".books-bottom");
let search_input = document.getElementById("search");
let books_container = document.querySelector("[data-book-template]");
let books = []
let filter_books = document.querySelector("select#filter_books");
filter_books.addEventListener("change",(e)=>{
  let selected_value = e.currentTarget.value;
  if(selected_value === "all"){
    books.forEach(book =>{
      book.element.classList.remove("hide")
    })
    return
  }
  books.forEach(book =>{
    let isFiltered = book.price_type === selected_value;
    book.element.classList.toggle("hide",!isFiltered)
  })
})

let displayMenuItems = (menuItems) => {
    books = menuItems.map(item => {
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
      //  return the book
      
      return {name:item.name, img:item.img, title:item.title, price:parsed_price, subtitle:item.subtitle,element:card,price_type:parsed_price < 30 ? "low_price" : "high_price"}
    })
}

// search bar
search_input.addEventListener("input",(e)=>{
  let text = e.currentTarget.value.toLowerCase()
  books.forEach(book =>{
    const isVisible = book.title.toLowerCase().includes(text)
    book.element.classList.toggle("hide",!isVisible);
  })

})

fetch("https://api.itbook.store/1.0/search/mongodb")
  .then((res) => res.json())
  .then((data) => {
    displayMenuItems(data.books)
    
  });