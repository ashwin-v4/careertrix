// Scroll to the top when the logo is clicked
document.querySelector('.logo-link').addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Handle header appearance/disappearance on scroll
let lastScrollTop = 0;
const shellBar = document.getElementById('shell-bar');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        shellBar.style.top = '-70px'; // Scroll down, hide header
    } else {
        shellBar.style.top = '0'; // Scroll up, show header
    }
    lastScrollTop = scrollTop;
});

// Fade-in and fade-out effect
const fadeInElements = document.querySelectorAll('.fade-in');

const checkFade = () => {
    const triggerBottom = window.innerHeight * 0.855; // Adjust the trigger to be closer to the viewport bottom

    fadeInElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        // Fade-in if element is in view, fade-out if not
        if (elementTop < triggerBottom && elementBottom > 0) {
            element.classList.add('fade-in-active');
        } else {
            element.classList.remove('fade-in-active');
        }
    });
};

window.addEventListener('scroll', checkFade);
checkFade(); // Initial check when the page loads

let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

// Enhance text effect on the channel link
const enhance = id => {
  const element = document.getElementById(id),
        text = element.innerText.split("");
  
  element.innerText = "";
  
  text.forEach((value, index) => {
    const outer = document.createElement("span");
    outer.className = "outer";
    
    const inner = document.createElement("span");
    inner.className = "inner";
    inner.style.animationDelay = `${rand(-5000, 0)}ms`;
    
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.innerText = value;
    letter.style.animationDelay = `${index * 1000 }ms`;
    
    inner.appendChild(letter);    
    outer.appendChild(inner);    
    element.appendChild(outer);
  });
}

enhance("channel-link");
