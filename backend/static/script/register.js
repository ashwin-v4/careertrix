const trailer = document.getElementById("trailer");
const resumeUpload = document.getElementById("resume-upload");
const registrationForm = document.getElementById("career-goals-form");
const interactables = document.querySelectorAll(".interactable");

const animateTrailer = (e, interacting) => {
    const x = e.clientX - trailer.offsetWidth / 2,
        y = e.clientY - trailer.offsetHeight / 2;

    const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`
    };

    trailer.animate(keyframes, {
        duration: 800,
        fill: "forwards"
    });
};

const getTrailerClass = type => {
    switch (type) {
        case "form":
            return "fa-solid fa-file-alt";
        case "resume":
            return "fa-solid fa-upload";
        default:
            return "fa-solid fa-arrow-up-right";
    }
};

const resetPositions = () => {
    interactables.forEach(item => {
        item.classList.remove("left", "right", "hidden");
        item.style.transition = "transform 0.8s ease, opacity 0.8s ease"; // Smooth return
    });
};

const toggleCardVisibility = (cardId, show = true) => {
    const card = document.getElementById(cardId);
    if (card) {
        console.log(`Toggling visibility of card with ID: ${cardId}`);
        if (show) {
            card.classList.add("visible");
            card.classList.remove("hidden");
        } else {
            card.classList.remove("visible");
            card.classList.add("hidden");
        }
    } else {
        console.log("Card not found");
    }
};


const showSection = (sectionToShow, sectionToHide, activeItem, inactiveItem) => {
    // Reset all positions first
    resetPositions();

    // Wait for reset to complete before starting the next animation
    setTimeout(() => {
        // Hide the inactive item by moving it to its corner
        inactiveItem.classList.add(inactiveItem.dataset.type === "form" ? "right" : "left");

        // Fade out the active item
        activeItem.classList.add("hidden");

        // Show the selected section after animation
        setTimeout(() => {
            sectionToHide.classList.remove("visible");
            sectionToHide.classList.add("hidden");

            sectionToShow.classList.remove("hidden");
            sectionToShow.classList.add("visible");
        }, 800); // Match transition duration
    }, 800); // Match reset duration
};

window.onmousemove = e => {
    const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;

    const icon = document.getElementById("trailer-icon");
    if (!interacting) {
        e.stopPropagation(); // Prevent interference
    }
    animateTrailer(e, interacting);

    trailer.dataset.type = interacting ? interactable.dataset.type : "";

    if (interacting) {
        icon.className = getTrailerClass(interactable.dataset.type);
    }
};

interactables.forEach(item => {
    item.addEventListener("click", () => {
        const type = item.dataset.type;
        const otherItem = Array.from(interactables).find(i => i !== item);

        console.log(`Clicked on interactable with type: ${type}`); // Debugging log

        if (type === "resume") {
            showSection(resumeUpload, registrationForm, item, otherItem);
            toggleCardVisibility("resume", true);  // Show the resume upload card by ID
            toggleCardVisibility("form", false);  // Hide the form details card by ID
        } else if (type === "form") {
            showSection(registrationForm, resumeUpload, item, otherItem);
            toggleCardVisibility("form", true);  // Show the form details card by ID
            toggleCardVisibility("resume", false);  // Hide the resume upload card by ID
        }
    });
});

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

// Enhance text effect on the channel link, if it exists
const enhance = id => {
  const element = document.getElementById(id);
  
  // Only run if the element exists
  if (element) {
    const text = element.innerText.split("");
    
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
}

enhance("channel-link");

