const login_section = document.querySelector(".login-section"); 
const register_section = document.querySelector(".register");
const validation_section = document.querySelector("[data-password-section]");
const validation_wrapper = document.querySelector(".validation-wrapper");
const send_email = document.querySelector(".send-email");
const validation_input = document.querySelector(".validation-input")
const valid_email = document.querySelector(".validation-email")
const validation_message = document.querySelector(".validation-message");


login_section.addEventListener("submit",(e)=>{
    e.preventDefault();
    let user_email = document.querySelector("#login_email");
    let username = document.querySelector("#login_username");
    let login_password = document.querySelector("#login_password");
    console.log(user_email.value);
    fetch("http://147.182.205.177:5000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email:user_email.value, username:username.value, password:login_password.value})
    }).then(res => res.json()).then(data => console.log(data))
})