const form = document.querySelector(".register-form");
const users = []

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let user = {}
    let name = form.querySelector("#name");
    let username = form.querySelector("#username");
    let email = form.querySelector("#email");
    let password = form.querySelector("#password");
    if (validate_username(name.value) && validate_username(username.value) && validate_email(email.value) && validate_password(password.value)) {
        user.name_ = name.value
        user.username = username.value
        user.email = email.value
        user.password = password.value
        window.location = "../cabinet.html"
    } else {
        alert("something went wrong");
    }
})

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