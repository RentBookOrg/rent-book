const login_section = document.querySelector(".login-section");
const register_section = document.querySelector(".register")
const form = document.querySelector(".register-form");
const login_link = document.querySelector(".register-login");
const signup_link = document.querySelector(".signup-link");
const form_inputs = document.querySelectorAll(".register-wrapper [data-form-input]");
let error = document.querySelector("[data-error-container]")
let err_text = error.querySelector("p");

// user_email 
// username 
// user_fullname
// password


login_link.addEventListener("click", (e) => {
    e.preventDefault();
    register_section.classList.remove("active-section");
    login_section.classList.add("active-section")
})

signup_link.addEventListener("click", (e) => {
    e.preventDefault();
    register_section.classList.add("active-section");
    login_section.classList.remove("active-section");
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let user = {}
    let name = form.querySelector("#user_fullname");
    let username = form.querySelector("#username");
    let email = form.querySelector("#user_email");
    let password = form.querySelector("#password");
    if (validate_username(name.value) && validate_username(username.value) && validate_email(email.value) && validate_password(password.value)) {
        user.name_ = name.value
        user.username = username.value
        user.email = email.value
        user.password = password.value
        window.location = "./views/cabinet.html"
    }
})

function validate_username(username) {
    return username >= 6
}

function validate_email(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(email).toLocaleLowerCase())
}

function validate_password(password) {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)
    // should contain at least one digit
    //   (?=.*[a-z])       // should contain at least one lower case
    //   (?=.*[A-Z])       // should contain at least one upper case
    //   [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
}

export default { login_section: login_section, register_section: register_section }