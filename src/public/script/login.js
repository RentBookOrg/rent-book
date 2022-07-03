const login_section = document.querySelector(".login-section"); 
const register_section = document.querySelector(".register");
const validation_section = document.querySelector("[data-password-section]");
const validation_wrapper = document.querySelector(".validation-wrapper");
const send_email = document.querySelector(".send-email");
const validation_input = document.querySelector(".validation-input")
const valid_email = document.querySelector(".validation-email")
const forgot_password = document.querySelector(".forgot-password");
const validation_message = document.querySelector(".validation-message");

forgot_password.addEventListener("click",(e)=>{
    e.preventDefault()
    login_section.classList.remove("active-section");
    register_section.classList.remove("active-section");
    validation_section.classList.add("active-section");
})

send_email.addEventListener("click",()=>{
    validation_wrapper.style.display = "none";
    valid_email.textContent = validation_input.value;
    validation_message.style.display = "block";
})