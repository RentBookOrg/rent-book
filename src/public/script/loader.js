let tl = gsap.timeline()

let header = document.querySelector(".loader h1");
let text = header.textContent.split("")
header.textContent = ""

for(let i = 0; i < text.length; i++){
    header.innerHTML += "<span>" + text[i] + "</span>"
}

let char = 0
let timer = setInterval(onTick, 50);

function onTick(){
    let span = header.querySelectorAll("span")[char]
    span.classList.add("fade");
    char++;
    if(char === text.length){
        complete();
        return
    }
}

function complete(){
    clearInterval(timer);
    timer = null

    tl.to(".loader",{
        opacity:0,
        pointerEvents:"none",
        duration:1,
        delay:1
    }).to(".site-header",{
        opacity:1,
        pointerEvents:"all"
    }).to(".books-section",{
        opacity:1,
        pointerEvents:"all"
    })
}
