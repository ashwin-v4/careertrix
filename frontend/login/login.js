const chars = "0123456789";

const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
      randomString = length => Array.from(Array(length)).map(randomChar).join("");

const card = document.querySelector(".card"),
      letters = card.querySelector(".card-letters");

const handleOnMove = e => {
  const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

  letters.style.setProperty("--x", `${x}px`);
  letters.style.setProperty("--y", `${y}px`);

  letters.innerText = randomString(10000);    
}

card.onmousemove = e => handleOnMove(e);
card.ontouchmove = e => handleOnMove(e.touches[0]);

const container = document.querySelector('.container');
const SignInLink = document.querySelector('.SignInLink');
const SignUpLink = document.querySelector('.SignUpLink');

// Toggle between sign in and sign up
SignUpLink.addEventListener('click', () => {
    container.classList.add('active');
});

SignInLink.addEventListener('click', () => {
    container.classList.remove('active');
});

// Update time and date
function updateTimeDate() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  document.getElementById('time').textContent = time;
  document.getElementById('date').textContent = date;
}

updateTimeDate();
setInterval(updateTimeDate, 60000); // Update every minute

document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const logPassword = document.getElementById('logpassword');
    const loginPasswordToggle = document.getElementById('loginPassword');
    const repeatPassword = document.getElementById('repPassword');
    const repeatPasswordToggle = document.getElementById('repeatPassword');
    const errorMessage = document.getElementById("error-message");
    const errorContainer = document.getElementById("error-container");

    // Toggle password visibility for login and registration
    if (loginPasswordToggle && logPassword) {
        loginPasswordToggle.addEventListener('click', () => {
            const type = logPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            logPassword.setAttribute('type', type);
            loginPasswordToggle.classList.toggle('bxs-lock-alt');
            loginPasswordToggle.classList.toggle('bxs-lock-open-alt');
        });
    }

    if (togglePassword && confirmPassword) {
        togglePassword.addEventListener('click', () => {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            togglePassword.classList.toggle('bxs-lock-alt');
            togglePassword.classList.toggle('bxs-lock-open-alt');
        });
    }

    if (repeatPasswordToggle && repeatPassword) {
        repeatPasswordToggle.addEventListener('click', () => {
            const type = repeatPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            repeatPassword.setAttribute('type', type);
            repeatPasswordToggle.classList.toggle('bxs-lock-alt');
            repeatPasswordToggle.classList.toggle('bxs-lock-open-alt');
        });
    }

    // Function to show error messages
    function showError(message) {
        errorMessage.innerText = message;
        errorContainer.style.display = 'block'; // Show the error message

        setTimeout(() => {
            errorContainer.style.display = 'none'; // Hide after 5 seconds
        }, 5000);
    }

    // Event listener for login form submission
document.getElementById('loginForm').addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("logusername").value;
    const password = document.getElementById("confirmPassword").value; // Use confirmPassword here

    // Password pattern validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
    if (!passwordPattern.test(password)) {
        showError("Password must be at least 8 characters long, contain a mix of uppercase, lowercase, numbers, and special characters (@ or #)");
        return;
    }

    // Hardcoded validation for username and password
    if (username === "password" && password === "User1@Name") {
        // Redirect to main page if valid
        window.location.href = "main.html";
    } else {
        // Display error message if username-password pair is invalid
        showError("Invalid username or password.");
    }
});




    // Event listener for register form validation
    document.getElementById('registerForm').addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById("signemail").value;
        const password = logPassword.value;
        const reenterPassword = repeatPassword.value;

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;
        if (!emailPattern.test(email)) {
            showError("Please enter a valid email address (example@domain.com or .in)");
            return;
        }

        // Password validation (min 8 characters, upper, lower, number, special)
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;
        if (!passwordPattern.test(password)) {
            showError("Password must be at least 8 characters long, contain a mix of uppercase, lowercase, numbers, and special characters (@ or #)");
            return;
        }

        // Password match check
        if (password !== reenterPassword) {
            showError("Passwords do not match");
            return;
        }

        // If all validation passes, submit the form
        errorMessage.innerText = ""; // Clear error message
        window.location.href = "user.html";
    });
});
