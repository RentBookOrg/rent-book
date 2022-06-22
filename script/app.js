let books_list = document.querySelector(".books-list");
let books_bottom = document.querySelector(".books-bottom");

let displayMenuItems = (menuItems) => {
    let displayMenu = menuItems.map(item => {
        let parsed_price = Math.floor(parseFloat(item.price.replace("$", "")));
        return `<li class="books-item">
                  <div class="item-top">
                    <p class="sale">Sale</p>
                    <img
                      class="item-img"
                      src="${item.image}"
                      alt="Template image"
                      width="160"
                      height="160"
                    />
                    <div class="item-wrapper">
                      <button class="bucket-btn item-wrapper-btn">
                        <i class="fa-solid fa-basket-shopping"></i>
                      </button>
                      <button class="like-btn item-wrapper-btn">
                        <i class="fa-solid fa-heart"></i>
                      </button>
                    </div>
                  </div>
                  <h3 class="book-title">
                    <a class="book-link" href="#">${item.title}</a>
                  </h3>
                  <del class="book-del">${parsed_price > 0 ? parsed_price - 10 + '$' : ""}</del
                  ><ins class="book-price">${item.price}</ins>
                  <p class="book-price-rent">0 soums / 12 months</p>
                  <button class="buy-btn" href="#">Buy now</button>
                </li>`;
    })
    displayMenu = displayMenu.join("")
    displayMenu = new DOMParser().parseFromString(displayMenu, "text/html")
    let items = displayMenu.querySelectorAll("li");
    for (let item of items) {
        books_list.appendChild(item)
    }
}

fetch("https://api.itbook.store/1.0/search/mongodb")
  .then((res) => res.json())
  .then((data) => {
    displayMenuItems(data.books)
    
  });