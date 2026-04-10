
// NAVBAR TOGGLE
function toggleMenu(){
    document.querySelector(".nav-links").classList.toggle("active");
}

// SCROLL ANIMATION
window.addEventListener("scroll",()=>{
    document.querySelectorAll(".reveal").forEach(el=>{
        if(el.getBoundingClientRect().top < window.innerHeight - 100){
            el.classList.add("active");
        }
    });
});

// TYPING EFFECT
const text = ["Frontend Developer", "JavaScript Learner", "Problem Solver"];
let i = 0, j = 0, current = "", isDeleting = false;

function type(){
    if(i < text.length){
        if(!isDeleting && j <= text[i].length){
            current = text[i].substring(0,j++);
        } else if(isDeleting && j >= 0){
            current = text[i].substring(0,j--);
        }

        if(j == text[i].length) isDeleting = true;
        if(j == 0){
            isDeleting = false;
            i = (i+1) % text.length;
        }

        document.getElementById("typing").innerHTML = current;
    }
    setTimeout(type,100);
}
type();
