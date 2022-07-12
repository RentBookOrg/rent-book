import { sendJSON, get_UserId } from "./db.js";

export const login_section = document.querySelector(".login-section");
export const register_section = document.querySelector(".register")
const is_user_registered = window.localStorage.getItem("user_id");
const form = document.querySelector(".register-form");
const register_btn = document.querySelector(".register-btn");
const login_link = document.querySelector(".register-login");
const signup_link = document.querySelector(".signup-link");
const form_inputs = document.querySelectorAll(".register-wrapper [data-form-input]");
let error = document.querySelector("[data-error-container]")
let err_text = error.querySelector("p");

// user_email 
// username 
// user_fullname
// password

if (is_user_registered) location.href = "./views/cabinet.html"

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
    console.log(e);
    e.preventDefault()
    let user = {}
    let name = form.querySelector("#user_fullname");
    let username = form.querySelector("#username");
    let email = form.querySelector("#user_email");
    let password = form.querySelector("#password");
    // 1. Name
    //     2. Surname
    //     3. Username
    //     4. email
    //     5. phone number
    //     6. password
    //     7. location
    if (name.value.length >= 3 && validate_username(username.value) && validate_email(email.value) && validate_password(password.value)) {
        user.name = name.value
        user.surname = name.value
        user.username = username.value
        user.user_email = email.value
        user.password = password.value
        user.location_id = `${window.localStorage.getItem("user_location_id")}`
        window.localStorage.setItem("user", user);
        console.log(user.location_id);
        user.user_contact = "998977321820"
        getId(user)
        // location.href = "./views/cabinet.html"
    } else {
        if (name.value.length < 3) {
            error.style.display = "block"
            error.style.transform = `translateY(0%)`;
            err_text.textContent = "Please make sure that your name has at least 3 characters";
        }
        else if (!validate_username(username.value)) {
            error.style.display = "block"
            error.style.transform = `translateY(0%)`;
            err_text.textContent = "Please make sure that your username has at least 6 characters";
        }
        else if (!validate_password(password.value)) {
            error.style.display = "block"
            error.style.transform = `translateY(0%)`;
            err_text.textContent = "Please make sure that your password has at least 8 characters -> at least one uppercase and lowercase letter, and at least one digit";
        }else if(!validate_email(email.value)){
            error.style.display = "block"
            error.style.transform = `translateY(0%)`;
            err_text.textContent = "Please enter valid email adress"
        }
    }
})



async function getId(data) {
    let id = await get_UserId(data).then(data => {
        if (data.message === "This user is already registered, please log in") {
            error.classList.add("cause");
            err_text.textContent = `${data.message}`
        }
        if (data.status === 200) {
            location.href = "./views/cabinet.html"
            window.localStorage.setItem("user_id", data.user_id)
        }
    })
}

function validate_username(username) {
    return username.length >= 6
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