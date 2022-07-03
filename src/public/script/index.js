let modal = document.querySelector(".modal");
let form = document.querySelector(".modal-form");
let location_select = document.querySelector(".location_select");
let modalBtn = document.querySelector(".modal-btn");
let post_btn = document.querySelector(".post-btn")
let cabinet_btn = document.querySelector(".cabinet-btn")
let user = {}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (location_select.value === "O'z hududingizni tanlang") return
})

if (!modal.style.display === "none") {
    document.body.style.overflow = "visible"
}

location_select.addEventListener("change", () => {
    modalBtn.classList.remove("not-allowed")
})

modalBtn.addEventListener("click", () => {
    if (location_select.value === "O'z hududingizni tanlang") return
    user.location = location_select.value
    modal.style.display = "none"
    document.body.style.overflow = "visible"
    console.log(user);
})

cabinet_btn.addEventListener("click", () => {
    location.href = "./views/register.html"
})

