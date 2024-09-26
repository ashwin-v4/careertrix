// Apply 'onmousemove' to elements with class 'link'
const links = document.getElementsByClassName("link");
if (links.length > 0) {
  for (const link of links) {
    link.onmousemove = e => {
      const decimal = e.clientX / link.offsetWidth;

      const basePercent = 80,
        percentRange = 20,
        adjustablePercent = percentRange * decimal;

      const lightBluePercent = basePercent + adjustablePercent;

      link.style.setProperty("--light-blue-percent", `${lightBluePercent}%`);
    };
  }
}

document.getElementById("cards").onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}


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
    
    setInterval(() => animate(star), 10000);
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


document.getElementById("generate-button").addEventListener("click", function () {
  const outputMessage = document.getElementById("output-message");
  const placeholderMessage = document.getElementById("placeholder-message");
  const iframe = document.getElementById("output-iframe");

  // Ensure you provide the correct link to your website or file.
  iframe.src = "your_website_link.html"; // Replace with your actual link.

  // Show the iframe and output message, hide the placeholder message.
  outputMessage.style.display = "block"; // Show the output message container.
  iframe.style.display = "block"; // Show the iframe.
  placeholderMessage.style.display = "none"; // Hide the placeholder message.
});