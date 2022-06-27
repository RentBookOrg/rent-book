const form = document.querySelector(".register-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input =>{

    })  
})

function validate_username(username){
    return username.length >= 6
}

function validate_email(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(email).toLocaleLowerCase())
}